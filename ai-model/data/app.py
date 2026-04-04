from flask import Flask, request, jsonify
from predictor import smart_mess_ai

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    result = smart_mess_ai(data)
    return jsonify(result)

if __name__ == '__main__':
                app.run(host="0.0.0.0",port=5001)