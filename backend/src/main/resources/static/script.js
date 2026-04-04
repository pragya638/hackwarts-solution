// ======================
// BOOK MEAL (FIXED)
// ======================
function bookMeal() {

    const name = document.getElementById("name").value.trim();
    const id = document.getElementById("id").value;
    const meal = document.getElementById("meal").value;
    const date = document.getElementById("date").value;

    if (!name || !id || !date) {
        alert("Please fill all fields ⚠️");
        return;
    }

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
}


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
    });
}


// ======================
// ALERT — static message (/api/alert endpoint does not exist)
// ======================
document.addEventListener("DOMContentLoaded", function() {
    const alertBox = document.getElementById("alertBox");
    if (alertBox) {
        alertBox.innerText = "🟢 SmartMess System Ready — Book your meal!";
    }
});