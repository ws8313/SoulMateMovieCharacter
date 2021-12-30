from werkzeug.datastructures import ContentRange
from app import db
from datetime import datetime
from pytz import timezone

class User(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=False, unique=True)
    pw = db.Column(db.String(20), nullable=False)
    mbti = db.Column(db.String(10))

    def __init__(self, id, pw):
        self.id = id
        self.pw = pw
    

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    content = db.Column(db.Text, nullable=False)

    def __init__(self, content):
        self.content = content


class Option(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'))
    question = db.relationship('Question', backref=db.backref('option'))
    content = db.Column(db.Text, nullable=False)
    mbti_indicator = db.Column(db.String(5), nullable=False) # mbti 유형 지표 예) I, E, N, S, T, F, J, P
    
    def __init__(self, question_id, content, mbti_indicator):
        self.content = content
        self.question_id = question_id
        self.mbti_indicator = mbti_indicator
        

class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    user_id = db.Column(db.String(20), db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('answer'))
    answers = db.Column(db.String(20), nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.now(timezone('Asia/Seoul')))

    def __init__(self, user_id, answers):
        self.user_id = user_id
        self.answers = answers


# 컬럼 추가해야 함.
class Movie(db.Model):
    id =  db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)


class Satisfaction(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    user_id = db.Column(db.String(20), db.ForeignKey('user.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    user_rating = db.Column(db.Integer, nullable=False)


class Soulmate(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    user_mbti = db.Column(db.String(10), nullable=False)
    soulmate_mbti = db.Column(db.String(10), nullable=False)