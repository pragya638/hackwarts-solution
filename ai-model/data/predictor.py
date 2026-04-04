import json
from sklearn.tree import DecisionTreeRegressor

# Encode function
def encode(data):
    day_map = {"Monday":1,"Tuesday":2,"Wednesday":3,"Thursday":4,"Friday":5,"Saturday":6,"Sunday":7}
    weather_map = {"hot":1,"normal":2,"rainy":3}

    return [
        day_map[data["day"]],
        data["is_holiday"],
        weather_map[data["weather"]]
    ]

# Train model
def train_model():
    with open("mess_data.json") as file:
        dataset = json.load(file)

    X = []
    y = []

    for d in dataset:
        X.append(encode(d))
        y.append(d["students"])

    model = DecisionTreeRegressor()
    model.fit(X, y)

    return model

# Predict
def predict_students(input_data):
    model = train_model()
    return int(model.predict([encode(input_data)])[0])

# Food calculation
def recommend_food(predicted_students):
    return {
        "rice_kg": round(predicted_students * 0.15, 2),
        "dal_kg": round(predicted_students * 0.08, 2),
        "roti_count": predicted_students * 3
    }

# Menu suggestion
def recommend_menu(weather):
    if weather == "hot":
        return ["Curd Rice", "Salad", "Buttermilk"]
    elif weather == "rainy":
        return ["Khichdi", "Pakoda", "Tea"]
    else:
        return ["Dal", "Rice", "Roti", "Sabji"]

# FINAL FUNCTION (UPDATED OUTPUT)
def smart_mess_ai(input_data):
    students = predict_students(input_data)
    food = recommend_food(students)
    menu = recommend_menu(input_data["weather"])
    return {
        "day": input_data["day"],
        "weather": input_data["weather"],
        "is_holiday": input_data["is_holiday"],
        "predicted_students": students,
        "food_quantity": food,
        "menu": menu
    }