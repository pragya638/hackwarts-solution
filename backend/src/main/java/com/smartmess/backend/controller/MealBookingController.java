package com.smartmess.backend.controller;

import com.smartmess.backend.model.MealBooking;
import com.smartmess.backend.service.MealBookingService;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
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


    @GetMapping("/prediction")
    public long predictMeals(@RequestParam String mealType) {
        return service.predict(mealType);
    }
    @GetMapping("/waste")
public long getWaste(@RequestParam String mealType) {
    return service.calculateWaste(mealType);
}
@GetMapping("/total")
public long getTotalBookings() {
    return service.getTotalBookings();
}
}