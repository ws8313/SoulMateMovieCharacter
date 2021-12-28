from flask import Blueprint
from flask import request, jsonify, g, session
from models import *

bp = Blueprint('main', __name__, url_prefix='/')


# @bp.before_app_request
# def load_logged_in_user():
#     user_email = session.get('login')
#     if login is None:
#         g.user = None
#     else:
#         g.user = db.session.query(User).filter(User.email == user_email).first()


@bp.route('/hello')
def hello():
    return 'Hello!'


@bp.route('/')
def index():
    return 'index'


@bp.route('/result', methods=["GET", "POST"])
def result():
    method = request.method
    
    if method == "GET":
        # 테스트 결과 보여주기
        answer = Answer.query.filter(Answer.user_id == g.user).order_by(Answer.submitted_at.desc()).first()


    # 테스트 진행 후 결과 데이터 저장
    # answers가 리스트 형태로 전달된다고 가정.
    elif method == "POST":
        user_id = request.form['user_id']
        answers = request.form['answers']

        

        # 리스트를 문자열로 변환
        answers = "".join(str(_) for _ in answers)

        answer = Answer(user_id, answers)
        db.session.add(answer)
        db.session.commit()
        return jsonify({"result": "success"})