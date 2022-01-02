from flask_restx import Resource, Namespace
from models import *

Test = Namespace('Test')

@Test.route('/<int:page>')
class Test(Resource):
    def get(self, page):
        # page 에 해당하는 문제 데이터 전달하기
        # 1페이지에서는 question만 데이터 있고 options는 null임.
        question = db.session.query(Question).filter(Question.id == page).first()
        options = db.session.query(Option).filter(Option.question_id == page).all()
        
        question = str(getattr(question, Question.content.name))
        options = [str(getattr(o, Option.content.name)) for o in options]
        
        return {
            "message": "success",
            "result": {
                "data": {
                    'question': question,
                    'options': options
                }
            }
        }