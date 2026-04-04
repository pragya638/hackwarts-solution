import random

def predict_students(input_data):
    base = 100

    if input_data["day"] in ["Saturday", "Sunday"]:
        base -= 30

    if input_data["is_holiday"] == 1:
        base -= 40

    if input_data["weather"] == "rainy":
        base -= 20
    elif input_data["weather"] == "hot":
        base -= 10

    return max(base + random.randint(-10, 10), 20)


def recommend_food(predicted_students):
    return {
        "rice_kg": round(predicted_students * 0.15, 2),
        "dal_kg": round(predicted_students * 0.08, 2),
        "roti_count": predicted_students * 3
    }


def recommend_menu(weather):
    if weather == "hot":
        return ["Curd Rice", "Salad", "Buttermilk"]
    elif weather == "rainy":
        return ["Khichdi", "Pakoda", "Tea"]
    else:
        return ["Dal", "Rice", "Roti", "Sabji"]


def smart_mess_ai(input_data):
    students = predict_students(input_data)
    food = recommend_food(students)
    menu = recommend_menu(input_data["weather"])

    return {
        "predicted_students": students,
        "food_quantity": food,
        "recommended_menu": menu
    }