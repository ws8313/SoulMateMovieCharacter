from db_connect import db

class User(db.Model):
    _id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    user_id = db.Column(db.String(20), nullable=False, unique=True)
    # pw = 

class UserAnswer(db.Model):
    _id = db.Column(db.Integer, primary_key=True, nullable=False , autoincrement=True)
    user_id = db.relationship("User", backref='useranswer')
    ans1 = db.Column(db.Boolean, nullable=False, unique=True)
    # ans2
    # ans3
    # ans4
    # ans5
    # ans6
    # ans7
    # ans8
    # ans9
    # ans10
    # ans11
    # ans12

    def __repr__(self):
        return '<user_answer %r>' % self.username

