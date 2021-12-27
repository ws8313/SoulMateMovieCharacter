from app import db

class User(db.Model):
    id = db.Column(db.String(20), primary_key=True, nullable=False, unique=True)
    pw = db.Column(db.String(20), nullable=False)
    mbti = db.Column(db.String(10))

    def __init__(self, id, pw):
        self.id = id
        self.pw = pw
    

class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    user_id = db.Column(db.String(20), db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('answer_set'))
    ans1 = db.Column(db.Boolean)
    ans2 = db.Column(db.Boolean)
    ans3 = db.Column(db.Boolean)
    ans4 = db.Column(db.Boolean)
    ans5 = db.Column(db.Boolean)
    ans6 = db.Column(db.Boolean)
    ans7 = db.Column(db.Boolean)
    ans8 = db.Column(db.Boolean)
    ans9 = db.Column(db.Boolean)
    ans10 = db.Column(db.Boolean)
    ans11 = db.Column(db.Boolean)
    ans12 = db.Column(db.Boolean)

    def __init__(self, user_id, answers):
        self.user_id = user_id
        self.ans1 = answers[0]
        self.ans2 = answers[1]
        self.ans3 = answers[2]
        self.ans4 = answers[3]
        self.ans5 = answers[4]
        self.ans6 = answers[5]
        self.ans7 = answers[6]
        self.ans8 = answers[7]
        self.ans9 = answers[8]
        self.ans10 = answers[9]
        self.ans11 = answers[10]
        self.ans12 = answers[11]


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