from flask import Blueprint
from flask import request, jsonify
from models import *

bp = Blueprint('main', __name__, url_prefix='/')


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
        print()
    # 테스트 진행 후 결과 데이터 저장
    elif method == "POST":
        user_id = request.form['user_id']
        answers = request.form['answers']
        answer = Answer(user_id, answers)
        db.session.add(answer)
        db.session.commit()
        return jsonify({"result": "success"})