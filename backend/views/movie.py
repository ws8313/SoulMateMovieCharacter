from flask_restx import Resource, Namespace, fields
from models import *

Movie = Namespace(
    name='Movie',
    description="영화 리스트 보여주는 페이지에서 사용하는 API",    
)

@Movie.route('/<string:character>')
@Movie.doc(params={'character': '어떤 캐릭터가 등장한 영화 목록을 get할 것인지 해당 캐릭터 이름'})
class MovieList(Resource):
    @Movie.response(200, 'Success')
    def get(self, character):
        """특정 캐릭터가 등장한 영화 목록"""
        return