from flask import request
from flask_restx import Resource, Namespace, fields
from sqlalchemy.sql.expression import column
from models import *
from flask_login import current_user
from collections import Counter
from app import login_manager
from sqlalchemy import func

Result = Namespace(
    name='Result',
    description="결과 페이지에서 사용하는 API"
)

mbti_fields = Result.model('User MBTI', {
    'user_mbti': fields.String(description="사용자 MBTI", example="ENTP")
})

answers_fields = Result.inherit('User Answers or direct input mbti', mbti_fields, {
    'answers': fields.List(fields.String)
})

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()

@Result.route('/')
class ShowResult(Resource):
    @Result.response(200, 'Success', mbti_fields)
    def get(self):
        """사용자 mbti 전달"""
        # 테스트 결과 -> 사용자 mbti 전달
        user = User.query.filter(User.id == current_user.id).first()
        return {
            'user_mbti': user.mbti
        }, 200


    @Result.expect(answers_fields)
    @Result.response(200, 'success')
    @Result.response(500, 'fail')
    def post(self):
        """테스트 진행 후 결과 데이터 저장. 
        answers가 ["a", "b", ..."] 형태 리스트 형태로 전달된다고 가정. answers 또는 user_mbti 둘 중 하나는 null값이 아니어야 함. 바로 결과보기의 경우 user_mbti 값만, 테스트 진행한 경우 answers 값만 post 요청하면 됨."""
        answers = request.json.get('answers')
        user_mbti = request.json.get('user_mbti')

        # answers가 None이 아니고 user_mbti가 None이면 테스트 진행 답변 기반으로 mbti 계산.
        if answers and user_mbti is None:
            result = [[], [], [], []]
            for i in range(len(answers)):
                mbti_indicator = db.session.query(Option.mbti_indicator).filter(Option.question_id == i+2, Option.content.like(answers[i]+'%')).first()
                mbti_indicator = str(getattr(mbti_indicator, Option.mbti_indicator.name))
                
                if mbti_indicator in ('I', 'E'):
                    result[0].append(mbti_indicator)
                elif mbti_indicator in ('N', 'S'):
                    result[1].append(mbti_indicator)
                elif mbti_indicator in ('T', 'F'):
                    result[2].append(mbti_indicator)
                elif mbti_indicator in ('P', 'J'):
                    result[3].append(mbti_indicator)
                else:
                    print('잘못된 데이터입니다.')
                    return {"post": "wrong data"}, 500
            
            # mbti 계산            
            user_mbti = ""
            for li in result:
                user_mbti += Counter(li).most_common(n=1)[0][0]            
            
            # 리스트를 문자열로 변환
            answers = "".join(str(_) for _ in answers)
            print(answers)
            answer = Answer(current_user.id, answers)
            db.session.add(answer)

        # 테스트를 진행했든, 바로 user_mbti를 입력 받았든 알게 된 user_mbti를 db에 저장
        user = User.query.filter(User.id == current_user.id).first()
        user.mbti = user_mbti

        db.session.commit()
        return {"post": "success"}


@Result.route('/same/top10')
class Top10Movies(Resource):
    def get(self):
        # 같은 유형에게 인기있는 영화 top10 보여주기
        # 영화 정보 : 이름, 이미지, 개봉일, 감독, 평점, 런타임, 배우, 장르
        # 워드 클라우드 보여주기

        same_mbti_users = db.session.query(User.id).filter(User.mbti == "ISFP")
        
        # TODO: 유저 평점도 넘길 수 있는 방법 찾아보기
        # top10 = db.session.query(Satisfaction.movie_id, func.avg(Satisfaction.user_rating).label('avg_rating')).filter(Satisfaction.user_id.in_(same_mbti_users)).group_by(Satisfaction.movie_id).order_by(func.avg(Satisfaction.user_rating).desc()).limit(10)

        top10 = db.session.query(Satisfaction.movie_id).filter(Satisfaction.user_id.in_(same_mbti_users)).group_by(Satisfaction.movie_id).order_by(func.avg(Satisfaction.user_rating).desc()).limit(10)

        top10_movie_infos = db.session.query(Movie.kor_title, Movie.eng_title, Movie.image_link, Movie.pub_year, Movie.director, Movie.rating, Movie.story, Movie.run_time).filter(Movie.id.in_(top10)).all()

        top10_movie_infos = [list(row) for row in top10_movie_infos]
        print(top10_movie_infos)

        # TODO: word cloud
        word_cloud = "I have to add image url. I will do when DA give word cloud data to me. please wait..."
        return {
            'top10_movie_infos': top10_movie_infos,
            'word_cloud': word_cloud
        }
