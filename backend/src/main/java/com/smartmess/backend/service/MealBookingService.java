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
}