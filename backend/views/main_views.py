from flask import Blueprint
from flask import request, jsonify, g, session, render_template, redirect, url_for
from flask_login import login_required, login_user, current_user, logout_user
from flask_bcrypt import Bcrypt
from models import *
from collections import Counter
from app import login_manager

bp = Blueprint('main', __name__, url_prefix='/')
bcrypt = Bcrypt()

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

@bp.before_app_request
def load_logged_in_user():
    # user_email = session.get('login')
    # if login is None:
    #     g.user = None
    # else:
    #     g.user = db.session.query(User).filter(User.email == user_email).first()
    g.user = "test"

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

@bp.route('/test/<int:question_number>', methods=["GET"])
def test(question_number):
    # question_number 에 해당하는 문제 데이터 전달하기
    question = db.session.query(Question).filter(Question.id == question_number).first()
    options = db.session.query(Option).filter(Option.question_id == question_number).all()
    
    question = str(getattr(question, Question.content.name))
    options = [str(getattr(o, Option.content.name)) for o in options]
    
    return jsonify({
        "message": "success",
        "result": {
            "data": {
                'question': question,
                'options': options
            }
        }
    })

@bp.route('/result', methods=["GET", "POST"])
def result():
    method = request.method
    
    if method == "GET":
        # 테스트 결과 -> 사용자 mbti 전달
        user = User.query.filter(User.id == g.user).first()
        return jsonify({
            "message": "success",
            "result": {
                "data": user.mbti
            }
        })

    # 테스트 진행 후 결과 데이터 저장
    # answers가 ["a", "b", ..."] 형태 리스트 형태로 전달된다고 가정.
    else:
        answers = request.form.getlist('answers')
        # print(answers)

        result = [[], [], [], []]
        for i in range(len(answers)):
            mbti_indicator = db.session.query(Option.mbti_indicator).filter(Option.question_id == i+1, Option.content.like(answers[i]+'%')).first()
            mbti_indicator = str(getattr(mbti_indicator, Option.mbti_indicator.name))
            
            if mbti_indicator in ('I', 'E'):
                result[0].append(mbti_indicator)
            elif mbti_indicator in ('N', 'S'):
                result[1].append(mbti_indicator)
            elif mbti_indicator in ('T', 'F'):
                result[2].append(mbti_indicator)
            elif mbti_indicator in ('P', 'J'):
                result[3].append(mbti_indicator)
            else:
                print('잘못된 데이터입니다.')
                return jsonify({"result": "wrong data"})
        
        # mbti 계산            
        user_mbti = ""
        for li in result:
            user_mbti += Counter(li).most_common(n=1)[0][0]
        # print(user_mbti)
        
        # mbti 저장
        user = User.query.filter(User.id == g.user).first()
        user.mbti = user_mbti

        # 리스트를 문자열로 변환
        answers = "".join(str(_) for _ in answers)

        answer = Answer(g.user, answers)
        db.session.add(answer)
        db.session.commit()
        return jsonify({"result": "success"})