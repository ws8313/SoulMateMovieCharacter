from flask import request, g
from flask_restx import Resource, Namespace
from models import *
from collections import Counter

Result = Namespace('Result')

@Result.route('/')
class Result(Resource):
    def get(self):
        # 테스트 결과 -> 사용자 mbti 전달
        user = User.query.filter(User.id == g.user).first()
        return {
            "message": "success",
            "result": {
                "data": user.mbti
            }
        }

    def post(self):
        # 테스트 진행 후 결과 데이터 저장
        # answers가 ["a", "b", ..."] 형태 리스트 형태로 전달된다고 가정.
        answers = request.form.getlist('answers')
        # print(answers)

        result = [[], [], [], []]
        for i in range(len(answers)):
            mbti_indicator = db.session.query(Option.mbti_indicator).filter(Option.question_id == i+1, Option.content.like(answers[i]+'%')).first()
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
                return {"result": "wrong data"}
        
        # mbti 계산            
        user_mbti = ""
        for li in result:
            user_mbti += Counter(li).most_common(n=1)[0][0]
        # print(user_mbti)
        
        # mbti 저장
        user = User.query.filter(User.id == g.user).first()
        user.mbti = user_mbti

        # 리스트를 문자열로 변환
        answers = "".join(str(_) for _ in answers)

        answer = Answer(g.user, answers)
        db.session.add(answer)
        db.session.commit()
        return {"result": "success"}