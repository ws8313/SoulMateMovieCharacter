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
# 현재 current_user.id 값을 확인하지 못하는 문제로 test를 참고해 우선 mbti값을 받아서 그 mbti를 가지는 캐릭터와 이미지를 가져오도록 했다. 이후 frontpage를 확인 받고 나면 그페이지에서 mbti값을 받아오지 않고도 백엔드 혼자서 current_id를 통해 값을 전송해 줄 수 있도록 할 예정이다.
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

