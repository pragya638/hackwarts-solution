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
<<<<<<< Updated upstream
  } catch (e) {
    console.error(e);
    alert("❌ Cannot reach backend.");
  }
=======

    fetch("/api/book-meal", {   // ✅ FIXED: was /api/book
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentName: name,
            studentId: Number(id),
            mealType: meal,
            date: date,
            quantity: 1
        })
    })
    .then(res => {
        console.log("BOOK STATUS:", res.status);
        if (!res.ok) {
            return res.text().then(text => {
                throw new Error(text || "Booking failed");
            });
        }
        return res.json().catch(() => ({}));
    })
    .then(() => {
        alert("Meal Booked ✅");
        loadDashboard();
    })
    .catch(err => {
        console.error("BOOK ERROR:", err);
        alert("Booking failed ❌\nCheck console (F12)");
    });
>>>>>>> Stashed changes
}

async function getPrediction() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayName = days[new Date().getDay()];
  const today = new Date().toISOString().split("T")[0];

<<<<<<< Updated upstream
  try {
    const predResponse = await fetch("http://127.0.0.1:8080/api/predict", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ day: dayName, is_holiday: 0, weather: "normal" })
=======
// ======================
// LOAD DASHBOARD (FIXED)
// ======================
function loadDashboard() {

    const loading = document.getElementById("loading");
    if (loading) loading.innerText = "Loading insights...";

    let date = document.getElementById("date").value;
    if (!date) {
        date = new Date().toISOString().split("T")[0];
    }

    fetch(`/api/admin-dashboard?date=${date}`)
    .then(res => {
        if (!res.ok) throw new Error("Dashboard API failed");
        return res.json();
    })
    .then(data => {
        console.log("DASHBOARD DATA:", data);

        // PREDICTION
        document.getElementById("prediction").innerText = data.prediction ?? "--";

        // WASTE
        let wastePercent = data.waste?.percentage ?? 0;
        let wasteCount = data.waste?.count ?? "--";
        document.getElementById("waste").innerText =
            wasteCount + " (" + wastePercent.toFixed(1) + "%)";

        let bar = document.getElementById("wasteBar");
        if (bar) bar.style.width = wastePercent + "%";

        // RISK — build from waste count
        let riskEl = document.getElementById("risk");
        let wasteVal = data.waste?.count ?? 0;
        let risk = wasteVal > 20 ? "HIGH" : wasteVal > 0 ? "MEDIUM" : "LOW";

        riskEl.innerText = risk;
        riskEl.classList.remove("badge-low", "badge-medium", "badge-high");
        if (risk === "HIGH") riskEl.classList.add("badge-high");
        else if (risk === "MEDIUM") riskEl.classList.add("badge-medium");
        else riskEl.classList.add("badge-low");

        // SUGGESTION
        document.getElementById("suggestion").innerText = data.suggestion ?? "--";

        // SUMMARY
        document.getElementById("summary").innerText =
            "B: " + (data.mealSummary?.breakfast ?? "--") +
            " | L: " + (data.mealSummary?.lunch ?? "--") +
            " | D: " + (data.mealSummary?.dinner ?? "--");

        // TREND — use booking stats (no /api/trends endpoint exists)
        document.getElementById("trend").innerText =
            "Total: " + (data.totalBookings ?? "--") +
            " | Active: " + (data.activeBookings ?? "--") +
            " | Cancelled: " + (data.cancelledBookings ?? "--");

        if (loading) loading.innerText = "";
    })
    .catch(err => {
        console.error("DASHBOARD ERROR:", err);
        if (loading) loading.innerText = "";
        alert("Dashboard failed ❌\nMake sure Flask is running on port 5001!");
>>>>>>> Stashed changes
    });

    const predData = await predResponse.json();

<<<<<<< Updated upstream
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
=======
// ======================
// ALERT — static message (/api/alert endpoint does not exist)
// ======================
document.addEventListener("DOMContentLoaded", function() {
    const alertBox = document.getElementById("alertBox");
    if (alertBox) {
        alertBox.innerText = "🟢 SmartMess System Ready — Book your meal!";
    }
});
>>>>>>> Stashed changes
