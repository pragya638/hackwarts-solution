from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    # simple dummy logic (for hackathon demo)
    day = data.get("day")
    is_holiday = data.get("is_holiday")
    weather = data.get("weather")

    base_students = 120

    if is_holiday == 1:
        base_students -= 40

    if weather == "rainy":
        base_students -= 10
    elif weather == "hot":
        base_students += 5

    result = {
        "day": day,
        "predicted_students": base_students,
        "food_quantity": {
            "dal_kg": round(base_students * 0.08, 2),
            "rice_kg": round(base_students * 0.15, 2),
            "roti_count": base_students * 3
        },
        "menu": ["Curd Rice", "Salad", "Buttermilk"]
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)