from flask import request
from flask_restx import Resource, Namespace, fields
from models import *
from flask_login import current_user
from collections import Counter
from app import login_manager

Character = Namespace(
    name='Character',
    description="mbti에 맞는 캐릭터 API"
)
# 받을값...x 보내줄값...db아니 csv내에 있는 mbti별 character데이터 
# 1. csv에서 db로 저장하기 
# 2. db값에서 일치하는 mbti의 캐릭터 검색, 다만 현재 캐릭터의 출연영화제목이 실제 영화제목과 일치하지 않는경우가 있어, join을 적절히 사용하여 불필요한 값을 가져오지 않도록 해야겠음.
character_fields = Character.model('User MBTI', {
    'user_mbti': fields.String(description="사용자 MBTI", example="ENTP")
})

answers_fields = Character.inherit('User Answers or direct input mbti', mbti_fields, {
    'answers': fields.List(fields.String)
})

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

@Character.route('/')
class ShowCharacter(Resource):
    @Character.response(200, 'Success', mbti_fields)
    def get(self):
        """사용자 mbti 전달"""
        # 테스트 결과 -> 사용자 mbti 전달
        user = User.query.filter(User.id == current_user.id).first()
        return {
            'user_mbti': user.mbti
        }, 200


    @Character.expect(answers_fields)
    @Character.response(200, 'success')
    @Character.response(500, 'fail')
    def post(self):
        """테스트 진행 후 결과 데이터 저장. 
        answers가 ["a", "b", ..."] 형태 리스트 형태로 전달된다고 가정. answers 또는 user_mbti 둘 중 하나는 null값이 아니어야 함. 바로 결과보기의 경우 user_mbti 값만, 테스트 진행한 경우 answers 값만 post 요청하면 됨."""
        answers = request.json.get('answers')
        user_mbti = request.json.get('user_mbti')

        # answers가 None이 아니고 user_mbti가 None이면 테스트 진행 답변 기반으로 mbti 계산.
        if answers and user_mbti is None:
            Character = [[], [], [], []]
            for i in range(len(answers)):
                mbti_indicator = db.session.query(Option.mbti_indicator).filter(Option.question_id == i+2, Option.content.like(answers[i]+'%')).first()
                mbti_indicator = str(getattr(mbti_indicator, Option.mbti_indicator.name))
                
                if mbti_indicator in ('I', 'E'):
                    Character[0].append(mbti_indicator)
                elif mbti_indicator in ('N', 'S'):
                    Character[1].append(mbti_indicator)
                elif mbti_indicator in ('T', 'F'):
                    Character[2].append(mbti_indicator)
                elif mbti_indicator in ('P', 'J'):
                    Character[3].append(mbti_indicator)
                else:
                    print('잘못된 데이터입니다.')
                    return {"post": "wrong data"}, 500
            
            # mbti 계산            
            user_mbti = ""
            for li in Character:
                user_mbti += Counter(li).most_common(n=1)[0][0]            
            
            # 리스트를 문자열로 변환
            answers = "".join(str(_) for _ in answers)
            print(answers)
            # TODO: current_user.id 바꿔야 함.
            answer = Answer(current_user.id, answers)
            db.session.add(answer)

        # 테스트를 진행했든, 바로 user_mbti를 입력 받았든 알게 된 user_mbti를 db에 저장
        # TODO: current_user.id 바꿔야 함.
        user = User.query.filter(User.id == current_user.id).first()
        user.mbti = user_mbti

        db.session.commit()
        return {"post": "success"}
