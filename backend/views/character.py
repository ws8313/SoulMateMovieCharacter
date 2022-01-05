# -*- coding: utf-8 -*-

from flask_restx import Resource, Namespace, fields
from flask_restx.marshalling import marshal
from models import *
from flask_login import current_user
from app import login_manager
import json

MbtiCharacter = Namespace(
    name='MbtiCharacter',
    description="mbti에 맞는 캐릭터 API"
)

matching_fields = MbtiCharacter.model('Mbti Character', {
    'characters_info': fields.List(fields.List(fields.String, example=[18,
      "Luna Lovegood",
      "https://www.personality-database.com/profile_images/717.png?=undefined"]))
})

movie_info_fields = MbtiCharacter.model('Movie info', {
    'id': fields.Integer(description="movie id"),
    'kor_title': fields.String,
    'eng_title': fields.String,
    'image_link': fields.String,
    'pub_year': fields.Integer,
    'director': fields.String,
    'rating': fields.Float,
    'story': fields.String,
    'run_time': fields.Integer,
    'genres': fields.List(fields.String)
})

character_N_movies_fields = MbtiCharacter.model('Character and Movies', {
    'character_name': fields.String(description="캐릭터 이름"),
    'movies': fields.List(fields.Raw(movie_info_fields))
})

total_character_N_movies_fields = MbtiCharacter.model('Characters and Movies List', {
    'total_character_N_movies': fields.List(fields.Raw(character_N_movies_fields))
})


def row2dict(row):
    dictionary = {}
    for column in row.__table__.columns:
        dictionary[column.name] = str(getattr(row, column.name))

    return dictionary


# 공통 코드를 함수화 시켜 따로 보관, mbti에 맞는 캐릭터를 출력
def ShowCharacter(mbti):
    character_list = Character.query.filter(Character.mbti == mbti).all()
    characters_info = [[ch.id, ch.name, ch.image_link] for ch in character_list]

    return {
        'character_info': characters_info
    }, 200

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == user_id).first()

# 기본 형태 유저의 mbti를 가지고 캐릭터 출력
@MbtiCharacter.route('/')
class UserCharacter(Resource):
    @MbtiCharacter.response(200, 'Success', matching_fields)
    def get(self):
        """mbti가 같은 character 출력"""
        user = User.query.filter(User.id == current_user.id).first()
        return ShowCharacter(user.mbti)
        
# 유저와 잘맞는 mbti를 가지고 캐릭터 출력
@MbtiCharacter.route('/compatibility')
class CompatibleMbti(Resource):
    @MbtiCharacter.response(200, 'Success', matching_fields)
    def get(self):
        """mbti궁합이 맞는 chracter 출력"""
        user = User.query.filter(User.id == current_user.id).first()
        compatible_mbti = Compatibility.query.filter(Compatibility.user_mbti == user.mbti).first()
        return ShowCharacter(compatible_mbti.compatible_mbti)


# #테스트용 코드
# @MbtiCharacter.route('/<string:mbti>')
# @MbtiCharacter.doc(params={'mbti': '검색할 mbti'})
# class UserCharacter(Resource):
#     @MbtiCharacter.response(200, 'Success', matching_fields)
#     def get(self, mbti):
#         """mbti가 같은 character 출력"""
#         return ShowCharacter(mbti)

# @MbtiCharacter.route('/compatibility/<string:mbti>')
# @MbtiCharacter.doc(params={'mbti': '검색할 mbti'})
# class CompatibleMbti(Resource):
#     @MbtiCharacter.response(200, 'Success', matching_fields)
#     def get(self, mbti):
#         """mbti궁합이 맞는 chracter 출력"""
#         compatible_mbti = Compatibility.query.filter(Compatibility.user_mbti == mbti).first()
#         return ShowCharacter(compatible_mbti.compatible_mbti)

@MbtiCharacter.route('/movie_list/<string:mbti>')
@MbtiCharacter.doc(params={'mbti': '등장한 영화 리스트를 볼 캐릭터의 mbti'})
class MovieListWithCharacters(Resource):
    @MbtiCharacter.response(200, 'Success', total_character_N_movies_fields)
    @MbtiCharacter.response(500, 'fail')
    def get(self, mbti):
        """mbti 에 해당하는 캐릭터가 등장한 영화 리스트"""
        # (캐릭터, 캐릭터의 등장 영화 리스트)의 리스트
        character_N_movie_list = []
        characters = ShowCharacter(mbti)[0]['character_info']
        for c in characters:
            # 영화 리스트 검색
            character = {}
            character['character_name'] = c[1] # c[1] : 캐릭터 이름
            movie_list = db.session.query(CharacterInMovie.movie_id).filter(CharacterInMovie.character_id == c[0]) # c[0] : 캐릭터 id

            movie_infos = []
            for row in movie_list:
                movie_info = db.session.query(Movie).filter(Movie.id == row.movie_id).first()
                temp_dict = row2dict(movie_info)
                genres = db.session.query(MovieGenre.genre).filter(MovieGenre.movie_id == row.movie_id).all()
                genres = [str(getattr(g, MovieGenre.genre.name)) for g in genres]
                temp_dict['genres'] = genres
                movie_infos.append(temp_dict)

            character['movies'] = movie_infos
            character_N_movie_list.append(character)
        
        # print(json.dumps(character_N_movie_list, ensure_ascii=False, indent=4))
        
        return {
            'total_character_N_movies': character_N_movie_list
        }
