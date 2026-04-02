package com.smartmess.backend.service;

import com.smartmess.backend.model.MealBooking;
import com.smartmess.backend.repository.MealBookingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class MealBookingService {

    private final MealBookingRepository repository;

    public MealBookingService(MealBookingRepository repository) {
        this.repository = repository;
    }

    
    public MealBooking save(MealBooking booking) {

        if (booking.getStatus() == null) {
            booking.setStatus("Booked");
        }

        if (booking.getDate() == null) {
            booking.setDate(LocalDate.now());
        }

        // DEBUG (VERY IMPORTANT)
        System.out.println("Saving booking: " + booking);

        return repository.save(booking);
    }

    public List<MealBooking> getAll() {
        return repository.findAll();
    }

    public List<MealBooking> getByDate(LocalDate date) {
        return repository.findByDate(date);
    }

    public MealBooking cancel(Long id) {
        MealBooking booking = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus("Cancelled");
        return repository.save(booking);
    }

    public long countActiveMeals(LocalDate date, String mealType) {
        return repository.countByDateAndMealTypeAndStatus(date, mealType, "Booked");
    }
    public long calculateWaste(String mealType) {
        List<MealBooking> bookings = repository.findAll();

        long total = bookings.stream()
                .filter(b -> b.getMealType().equalsIgnoreCase(mealType))
                .count();

        long predicted = predict(mealType);

        long waste = total - predicted;

        return Math.max(waste, 0);
    }

    
    public long predict(String mealType) {

        List<MealBooking> bookings = repository.findAll();

        long total = bookings.stream()
                .filter(b -> b.getMealType() != null &&
                        b.getMealType().equalsIgnoreCase(mealType))
                .count();

        
        long prediction = (long) (total * 0.9);

        return prediction;
    }
    public long getTotalBookings() {
    return repository.count();
}
}