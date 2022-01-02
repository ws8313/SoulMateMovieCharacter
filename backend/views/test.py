from flask_restx import Resource, Namespace, fields
from models import *

Test = Namespace(
    name='Test',
    description="테스트 진행 페이지에서 사용하는 API",    
)

question_fields = Test.model('Question', {
    'question': fields.String(description="심리 테스트 문항", example="1. 어떤 영화를 볼까요?")
})

# TODO: 문자열의 리스트 전달할 예정. 수정해야 함. 오류 있음.
option_fields = Test.inherit('Options', question_fields, {
    'options': fields.String(description="심리 테스트 문항에 따른 선택지", enum=["a. 선택 1", "b. 선택 2"])
})

@Test.route('/<int:page>')
@Test.doc(params={'page': '어떤 페이지에 해당하는 심리 테스트 문항을 볼 것인지 페이지 넘버'})
class TestPage(Resource):
    @Test.response(201, 'Success', option_fields)
    def get(self, page):
        """page 에 해당하는 문제 데이터 전달,
         1페이지에서는 question만 데이터 있고 options는 null입니다."""
        question = db.session.query(Question).filter(Question.id == page).first()
        options = db.session.query(Option).filter(Option.question_id == page).all()
        
        question = str(getattr(question, Question.content.name))
        options = [str(getattr(o, Option.content.name)) for o in options]
        
        return {
            'question': question,
            'options': options
        }, 201