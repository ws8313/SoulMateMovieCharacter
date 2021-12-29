from flask import Blueprint
from flask import request, jsonify, g, session, render_template
from models import *
from collections import Counter

bp = Blueprint('main', __name__, url_prefix='/')


@bp.before_app_request
def load_logged_in_user():
    # user_email = session.get('login')
    # if login is None:
    #     g.user = None
    # else:
    #     g.user = db.session.query(User).filter(User.email == user_email).first()
    g.user = "test"

@bp.route('/hello')
def hello():
    return 'Hello!'


@bp.route('/')
def index():
    g.user = 'test'
    return render_template("test.html")


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
                return
        
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