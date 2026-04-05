# 🍽️ SmartMess — AI-Powered Mess Management System

> **Team: MessMind** | Raj Kumar Goel Institute of Technology, Ghaziabad

---

## 🚀 Problem Statement
College mess systems rely on guesswork for food preparation, leading to:
- 30–40% food wasted daily
- ₹5,000–₹15,000 monthly financial loss
- No real-time student demand visibility
- Over-preparation or food shortages

---

## ✅ Our Solution
**SmartMess** — A smart, web-based mess management system that:
- Enables student meal pre-booking → real-time demand data
- Uses AI/ML to predict actual food demand (not guesswork)
- Tracks waste patterns and suggests optimizations
- Collects student feedback for continuous improvement
- Works without any hardware → 100% software, low-cost & scalable

---

## 💡 Key Features
- 📅 **Meal Pre-Booking** — Students book meals in advance
- 🤖 **AI Demand Prediction** — Flask ML model predicts daily footfall
- 📊 **Admin Dashboard** — Real-time waste, risk level & suggestions
- ⭐ **Student Feedback** — Rating & comment system with summary
  

---

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Backend | Java, Spring Boot |
| Frontend | HTML, CSS, JavaScript |
| Database | MySQL |
| AI/ML Model | Python, Flask |
| Version Control | Git, GitHub |

---

## 📁 Project Structure
```
Hackwarts-Solution/
├── ai-model/
│   └── app.py              → Python Flask ML Model
├── backend/
│   └── src/main/
│       ├── java/com/smartmess/
│       │   ├── controller/ → REST APIs
│       │   ├── model/      → MealBooking Entity
│       │   ├── repository/ → Database Layer
│       │   └── service/    → Business Logic
│       └── resources/
│           ├── static/     → Frontend (HTML, CSS, JS)
│           └── application.properties
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
```
## 🔧 How to Run

### Step 1: Start Flask AI Model
```bash
cd ai-model
python app.py
```
Runs on http://localhost:5001

### Step 2: Start Spring Boot Backend
```bash
cd backend
./mvnw spring-boot:run
```
Runs on http://localhost:8080

### Step 3: Open Browser
http://127.0.0.1:8080/index.html
---

## 📊 Impact
- ✅ Cuts food waste by **30–40%**
- ✅ Saves **₹5,000–₹15,000/month** for mess owners
- ✅ Improves meal availability & student satisfaction
- ✅ Data-driven decision making replaces guesswork

---

## 👥 Team Members
| Name | Role |
|---|---|
| Pragya Dwivedi | Backend + AI Integration (Team Lead) |
| Parul |Prediction logic+ Presentation |
| Rimjhim Mittal | UI/UX  |

---

## 🏆 Hackathon
**Event:** Hackwarts
**Theme:** Fashion & Lifestyle
**Institute:** Raj Kumar Goel Institute of Technology, Ghaziabad
