from flask import Flask

# 애플리케이션 팩토리
# flask run으로 실행해야 함.
def create_app():
    app = Flask(__name__)

    @app.route('/')
    def hello_world():
        return 'Hello World!'

    return app