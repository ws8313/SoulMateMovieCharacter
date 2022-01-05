from flask_restx import Resource, Namespace, fields
from models import *
from flask_login import current_user
from app import login_manager

MbtiCharacter = Namespace(
    name='MbtiCharacter',
    description="mbti에 맞는 캐릭터 API"
)

matching_fields = MbtiCharacter.model('Mbti Character', {
    'character_name': fields.List(fields.String),
    'character_image': fields.List(fields.String)
})
# 공통 코드를 함수화 시켜 따로 보관, mbti에 맞는 캐릭터를 출력
def ShowCharacter(mbti):
    character_list = Character.query.filter(Character.mbti == mbti).all()

    character_name = [str(getattr(o, Character.name.name)) for o in character_list]
    character_image = [str(getattr(o, Character.image_link.name)) for o in character_list]

    return {
        'character_name': character_name,
        'character_image': character_image
    }, 200

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()

# 기본 형태 유저의 mbti를 가지고 캐릭터 출력
@MbtiCharacter.route('/')
class UserCharacter(Resource):
    @MbtiCharacter.response(200, 'Success', matching_fields)
    def get(self):
        user = User.query.filter(User.id == current_user.id).first()
        return ShowCharacter(user.mbti)
        
# 유저와 잘맞는 mbti를 가지고 캐릭터 출력
@MbtiCharacter.route('/compatibility')
class CompatibleMbti(Resource):
    @MbtiCharacter.response(200, 'Success', matching_fields)
    def get(self):
        user = User.query.filter(User.id == current_user.id).first()
        compatible_mbti = Compatibility.query.filter(Compatibility.user_mbti == user.mbti).first()
        return ShowCharacter(compatible_mbti.compatible_mbti)


# #테스트용 코드
# @MbtiCharacter.route('/<string:mbti>')
# @MbtiCharacter.doc(params={'mbti': '검색할 mbti'})
# class UserCharacter(Resource):
#     @MbtiCharacter.response(200, 'Success', matching_fields)
#     def get(self, mbti):
#         return ShowCharacter(mbti)

# @MbtiCharacter.route('/compatibility/<string:mbti>')
# @MbtiCharacter.doc(params={'mbti': '검색할 mbti'})
# class CompatibleMbti(Resource):
#     @MbtiCharacter.response(200, 'Success', matching_fields)
#     def get(self, mbti):
#         compatible_mbti = Compatibility.query.filter(Compatibility.user_mbti == mbti).first()
#         return ShowCharacter(compatible_mbti.compatible_mbti)