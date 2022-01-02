from flask import request, g, redirect, url_for, render_template
from flask_restx import Resource, Namespace
from flask_login import login_required, login_user, current_user, logout_user
from app import login_manager
from models import *
from flask_bcrypt import Bcrypt


User = Namespace('User')
bcrypt = Bcrypt()

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=user_id).first()

@User.route('/login')
class Login(Resource):
    def post(self):
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
    
    def get(self):
        return render_template("login.html")


@User.route('/logout')
class Logout(Resource):
    @login_required
    def get(self):
        logout_user()
        return redirect(url_for('main.home'))


@User.route('/register')
class Register(Resource):
    def get(self):
        return render_template("register.html")

    def post(self):
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
