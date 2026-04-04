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

    fetch("http://127.0.0.1:8080/api/book", {   // 👈 try localhost ↔ 127.0.0.1 if needed
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentName: name,
            studentId: Number(id),   // safe parsing
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

        return res.json().catch(() => ({})); // handle empty response
    })
    .then(() => {
        alert("Meal Booked ✅");

        // auto refresh dashboard
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

    fetch(`http://127.0.0.1:8080/api/admin-dashboard?date=${date}`)
    .then(res => {
        console.log("DASHBOARD STATUS:", res.status);

        if (!res.ok) {
            throw new Error("Dashboard API failed");
        }

        return res.json();
    })
    .then(data => {

        console.log("DASHBOARD DATA:", data);

        // ======================
        // PREDICTION
        // ======================
        document.getElementById("prediction").innerText =
            data.prediction ?? "--";

        // ======================
        // WASTE
        // ======================
        let wastePercent = data.waste?.percentage ?? 0;
        let wasteCount = data.waste?.count ?? "--";

        document.getElementById("waste").innerText =
            wasteCount + " (" + wastePercent.toFixed(1) + "%)";

        let bar = document.getElementById("wasteBar");
        if (bar) bar.style.width = wastePercent + "%";

        // ======================
        // RISK
        // ======================
        let riskEl = document.getElementById("risk");
        let risk = data.riskLevel ?? "--";

        riskEl.innerText = risk;

        riskEl.classList.remove("badge-low", "badge-medium", "badge-high");

        if (risk === "HIGH") riskEl.classList.add("badge-high");
        else if (risk === "MEDIUM") riskEl.classList.add("badge-medium");
        else if (risk === "LOW") riskEl.classList.add("badge-low");

        // ======================
        // SUGGESTION
        // ======================
        document.getElementById("suggestion").innerText =
            data.suggestion ?? "--";

        // ======================
        // SUMMARY
        // ======================
        document.getElementById("summary").innerText =
            "B: " + (data.mealSummary?.breakfast ?? "--") +
            " | L: " + (data.mealSummary?.lunch ?? "--") +
            " | D: " + (data.mealSummary?.dinner ?? "--");

        // ======================
        // TREND API
        // ======================
        return fetch("http://127.0.0.1:8080/api/trends?mealType=Breakfast");
    })
    .then(res => res.json())
    .then(trendData => {
        document.getElementById("trend").innerText =
            trendData.last7Days?.join(" → ") || "--";
    })
    .catch(err => {
        console.error("DASHBOARD ERROR:", err);
        alert("Dashboard failed ❌ (check console)");
    })
    .finally(() => {
        if (loading) loading.innerText = "";
    });
}



// ======================
// ALERT API (AUTO LOAD)
// ======================
fetch("http://127.0.0.1:8080/api/alert")
.then(res => {
    if (!res.ok) throw new Error("Alert API failed");
    return res.text();
})
.then(data => {
    document.getElementById("alertBox").innerText = data;
})
.catch(err => {
    console.error("ALERT ERROR:", err);
    document.getElementById("alertBox").innerText = "No alerts";
});