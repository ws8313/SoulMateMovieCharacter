from flask_sqlalchemy import model


from models import *
mate = Soulmate(user_mbti=first, soulmate_mbti=second)
db.session.add(mate)
db.session.commit()