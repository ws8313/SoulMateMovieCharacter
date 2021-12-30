from flask import Blueprint
from flask import request, jsonify, g, session, render_template, redirect, url_for
from flask_login import login_required, login_user, current_user, logout_user
from flask_bcrypt import Bcrypt
from models import *
from app import login_manager

bp = Blueprint('main', __name__, url_prefix='/')
bcrypt = Bcrypt()


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

# @bp.before_app_request
# def load_logged_in_user():
#     user_email = session.get('login')
#     if login is None:
#         g.user = None
#     else:
#         g.user = db.session.query(User).filter(User.email == user_email).first()


@bp.route('/index')
def index():
    g.user = 'test'
    return render_template("test.html")

@bp.route('/')
def home():
    return render_template("main.html")
    
@bp.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        user_data = User.query.filter_by(id=request.form['user_id']).first()
        if not user_data:
            if not request.form['user_pw']==request.form['user_pw2']:
                #비밀번호 불일치
                return redirect(url_for("main.register"))
            user_id = request.form["user_id"]
            pw_hash = bcrypt.generate_password_hash(request.form["user_pw"])
            user = User(id=user_id, pw=pw_hash)
            db.session.add(user)
            db.session.commit()
            #회원가입 성공
            return redirect(url_for("main.home"))
        else:
            return redirect(url_for("main.register"))
    else:
        return render_template("register.html")

@bp.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']
        user_data = User.query.filter(User.id==user_id).first()
        if not user_data:
            # 아이디 틀림
            return redirect(url_for('main.login'))
        elif not bcrypt.check_password_hash(user_data.pw, user_pw):
            # 비밀번호 틀림
            return redirect(url_for('main.login'))
        else:
            login_user(user_data)
            # 로그인 진행
            return redirect(url_for('main.home'))        
    else:
        return render_template("login.html")

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.home'))


@bp.route('/result', methods=["GET", "POST"])
def result():
    method = request.method
    
    if method == "GET":
        # 테스트 결과 보여주기
        # answers = Answer.query.filter(Answer.user_id == g.user).order_by(Answer.submitted_at.desc()).first()
        return render_template("test.html")

    # 테스트 진행 후 결과 데이터 저장
    # answers가 ["a", "b", ..."] 형태 리스트 형태로 전달된다고 가정.
    else:
        answers = request.form.getlist('answers')
        print(answers)
        for i in range(len(answers)):
            option = db.session.query(Option.mbti_indicator).filter(Option.question_id == i+1, Option.content.like(answers[i]+'%')).first()
            option = str(getattr(option, Option.mbti_indicator.name))
            # TODO: mbti 계산

        # 리스트를 문자열로 변환
        # answers = "".join(str(_) for _ in answers)

        # answer = Answer(g.user, answers)
        # db.session.add(answer)
        # db.session.commit()
        return jsonify({"result": "success"})