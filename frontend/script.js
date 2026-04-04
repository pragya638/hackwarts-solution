async function bookMeal() {
  const studentName = document.getElementById("studentName").value.trim();
  const studentId   = document.getElementById("studentId").value.trim();
  const mealType    = document.getElementById("mealType").value;
  const date        = document.getElementById("date").value;

  if (!studentName || !studentId || !date) {
    alert("Please fill in all fields!");
    return;
  }

  const data = {
    studentId:   parseInt(studentId),
    studentName: studentName,
    mealType:    mealType,
    date:        date,
    quantity:    1,
    status:      "Booked"
  };

  try {
    const response = await fetch("http://127.0.0.1:8080/api/book-meal", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      alert("✅ Meal booked! ID: " + result.id + " | " + result.mealType + " on " + result.date);
    } else {
      alert("❌ Booking failed: " + response.status);
    }
  } catch (e) {
    console.error(e);
    alert("❌ Cannot reach backend.");
  }
}

async function getPrediction() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayName = days[new Date().getDay()];
  const today = new Date().toISOString().split("T")[0];

  try {
    const predResponse = await fetch("http://127.0.0.1:8080/api/predict", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ day: dayName, is_holiday: 0, weather: "normal" })
    });

    const predData = await predResponse.json();

    const dashResponse = await fetch("http://127.0.0.1:8080/api/admin-dashboard?date=" + today);
    const dashData = await dashResponse.json();

    document.getElementById("prediction").innerText = predData.predicted_students + " students";

    const wasteCount = dashData.waste?.count ?? 0;
    document.getElementById("waste").innerText = wasteCount + " meals — " + (dashData.waste?.message ?? "");
    document.getElementById("risk").innerText = wasteCount > 20 ? "🔴 HIGH" : wasteCount > 0 ? "🟡 MEDIUM" : "🟢 LOW";
    document.getElementById("suggestion").innerText = dashData.suggestion ?? "N/A";

    const ms = dashData.mealSummary ?? {};
    document.getElementById("menu").innerText = "Breakfast: " + (ms.breakfast??0) + " | Lunch: " + (ms.lunch??0) + " | Dinner: " + (ms.dinner??0);
    document.getElementById("trend").innerText = "Total: " + (dashData.totalBookings??0) + " | Cancelled: " + (dashData.cancelledBookings??0);

  } catch (error) {
    console.error(error);
    alert("❌ Make sure Flask (port 5001) is also running!");
  }
}