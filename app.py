from flask import Flask

app = Flask(__name__)

# if __name__ == '__main__':
#     # local에서는 port 5000 debug True로 하기
#     # 배포시에 port 80 debug False로!
#     app.run('0.0.0.0', 5000, debug=True)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()