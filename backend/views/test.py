from flask_restx import Resource, Namespace
from models import *

Test = Namespace(
    name='Test',
    description="테스트 진행 페이지에서 사용하는 API",    
)

@Test.route('/<int:page>')
class TestPage(Resource):
    def get(self, page):
        """page 에 해당하는 문제 데이터 전달,
         1페이지에서는 question만 데이터 있고 options는 null입니다."""
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