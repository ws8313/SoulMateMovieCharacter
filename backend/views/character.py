from flask_restx import Resource, Namespace, fields
from models import *
from flask_login import current_user
from app import login_manager

MbtiCharacter = Namespace(
    name='MbtiCharacter',
    description="mbti에 맞는 캐릭터 API"
)

matching_fields = MbtiCharacter.model('Mbti Character', {
    'character_name': fields.List(fields.String)
})

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()

@MbtiCharacter.route('/<string:mbti>')
@MbtiCharacter.doc(params={'mbti': '검색할 mbti'})
class ShowCharacter(Resource):
    @MbtiCharacter.response(200, 'Success', matching_fields)
    def get(self, mbti):
        # user = User.query.filter(User.id == current_user.id).first()
        character_list = Character.query.filter(Character.mbti == mbti).all()

        character_name = [str(getattr(o, Character.name.name)) for o in character_list]
        character_image = [str(getattr(o, Character.image_link.name)) for o in character_list]


        return {
            'character_name': character_name,
            'character_image': character_image
        }, 200

