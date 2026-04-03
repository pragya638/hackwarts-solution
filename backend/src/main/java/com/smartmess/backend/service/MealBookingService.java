package com.smartmess.backend.service;

import com.smartmess.backend.model.MealBooking;
import com.smartmess.backend.repository.MealBookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MealBookingService {

    private final MealBookingRepository repository;

    public MealBookingService(MealBookingRepository repository) {
        this.repository = repository;
    }

    // ================= SAVE =================
    public MealBooking save(MealBooking booking) {

        if (booking.getStatus() == null) {
            booking.setStatus("Booked");
        }

        if (booking.getDate() == null) {
            booking.setDate(LocalDate.now());
        }

        System.out.println("Saving booking: " + booking);

        return repository.save(booking);
    }

    // ================= FETCH =================
    public List<MealBooking> getAll() {
        return repository.findAll();
    }

    public List<MealBooking> getByDate(LocalDate date) {
        return repository.findByDate(date);
    }

    // ================= CANCEL =================
    public MealBooking cancel(Long id) {
        MealBooking booking = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("Cancelled");
        return repository.save(booking);
    }

    // ================= COUNT =================
    public long countActiveMeals(LocalDate date, String mealType) {
        return repository.countByDateAndMealTypeAndStatus(date, mealType, "Booked");
    }

    public long getTotalBookings() {
        return repository.count();
    }

    // ================= PREDICTION =================
    public long predict(String mealType, LocalDate date) {

        List<MealBooking> bookings = repository.findByDate(date);

        long total = bookings.stream()
                .filter(b -> b.getMealType() != null &&
                        b.getMealType().equalsIgnoreCase(mealType))
                .count();

        // Avoid 0 prediction (important for demo)
        return Math.max((long) (total * 0.9), 1);
    }

    // ================= WASTE =================
    public long calculateWaste(String mealType, LocalDate date) {

        List<MealBooking> bookings = repository.findByDate(date);

        long total = bookings.stream()
                .filter(b -> b.getMealType().equalsIgnoreCase(mealType))
                .count();

        long predicted = predict(mealType, date);

        long waste = total - predicted;

        return Math.max(waste, 0);
    }

    // ================= SUGGESTION =================
    public String getSmartSuggestion(String mealType, LocalDate date) {

        long waste = calculateWaste(mealType, date);

        if (waste > 20) {
            return "High waste detected. Reduce preparation for " + mealType;
        } else if (waste > 0) {
            return "Slight waste detected. Optimize quantity for " + mealType;
        } else {
            return "Perfect planning. No waste for " + mealType;
        }
    }

    // ================= DASHBOARD =================
    public Map<String, Object> getAdminDashboard(LocalDate date) {

        Map<String, Object> data = new HashMap<>();

        List<MealBooking> all = repository.findAll();

        long total = all.size();

        long booked = all.stream()
                .filter(b -> "Booked".equalsIgnoreCase(b.getStatus()))
                .count();

        long cancelled = all.stream()
                .filter(b -> "Cancelled".equalsIgnoreCase(b.getStatus()))
                .count();

        // Meal Summary
        Map<String, Long> mealSummary = new HashMap<>();
        mealSummary.put("breakfast", repository.countByDateAndMealTypeAndStatus(date, "Breakfast", "Booked"));
        mealSummary.put("lunch", repository.countByDateAndMealTypeAndStatus(date, "Lunch", "Booked"));
        mealSummary.put("dinner", repository.countByDateAndMealTypeAndStatus(date, "Dinner", "Booked"));

        // Prediction
        long prediction = predict("Breakfast", date);

        // Waste
        long waste = calculateWaste("Breakfast", date);

        long mealTotal = repository.countByDateAndMealTypeAndStatus(date, "Breakfast", "Booked");

        double wastePercentage = mealTotal == 0 ? 0 : (waste * 100.0 / mealTotal);

        Map<String, Object> wasteData = new HashMap<>();
        wasteData.put("count", waste);
        wasteData.put("percentage", wastePercentage);
        wasteData.put("message", waste > 0
                ? "Reduce preparation to minimize waste"
                : "Food usage is optimized");

        // Risk Level
        String risk;
        if (waste > 20) {
            risk = "HIGH";
        } else if (waste > 0) {
            risk = "MEDIUM";
        } else {
            risk = "LOW";
        }

        // Final Response
        data.put("totalBookings", total);
        data.put("activeBookings", booked);
        data.put("cancelledBookings", cancelled);
        data.put("mealSummary", mealSummary);
        data.put("prediction", prediction);
        data.put("waste", wasteData);
        data.put("suggestion", getSmartSuggestion("Breakfast", date)); 

        return data;
    }
}