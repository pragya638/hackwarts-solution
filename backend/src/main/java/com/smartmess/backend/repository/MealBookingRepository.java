package com.smartmess.backend.repository;

import com.smartmess.backend.model.MealBooking;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MealBookingRepository extends JpaRepository<MealBooking, Long> {

    List<MealBooking> findByDate(LocalDate date);
    long countByDateAndMealTypeAndStatus(LocalDate date, String mealType, String status);
}