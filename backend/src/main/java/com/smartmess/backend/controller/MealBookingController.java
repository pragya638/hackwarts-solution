package com.smartmess.backend.controller;

import com.smartmess.backend.model.MealBooking;
import com.smartmess.backend.repository.MealBookingRepository;
import com.smartmess.backend.service.MealBookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class MealBookingController {

    private final MealBookingService service;

    public MealBookingController(MealBookingService service) {
        this.service = service;
    }

    @PostMapping("/book-meal")
    public MealBooking bookMeal(@RequestBody MealBooking booking) {
        return service.save(booking);
    }

    @GetMapping("/bookings")
    public List<MealBooking> getAllBookings() {
        return service.getAll();
    }
    @PutMapping("/cancel/{id}")
public MealBooking cancelMeal(@PathVariable Long id) {
    return service.cancel(id);
}
@GetMapping("/bookings/{date}")
public List<MealBooking> getByDate(@PathVariable String date) {
    return service.getByDate(LocalDate.parse(date));
}
@GetMapping("/count")
public long getCount(
        @RequestParam String date,
        @RequestParam String mealType) {

    return service.countActiveMeals(
            LocalDate.parse(date),
            mealType
    );
}

}