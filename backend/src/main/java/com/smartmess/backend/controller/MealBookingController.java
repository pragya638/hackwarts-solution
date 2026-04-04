package com.smartmess.backend.controller;

import com.smartmess.backend.dto.PredictionRequest;
import com.smartmess.backend.model.MealBooking;
import com.smartmess.backend.service.AiService;
import com.smartmess.backend.service.MealBookingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MealBookingController {

    private final MealBookingService service;


    @Autowired
    private AiService aiService;

    

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
        return service.predict(mealType, null);
    }
    @GetMapping("/waste")
public long getWaste(@RequestParam String mealType) {
    return service.calculateWaste(mealType, null);
}
@GetMapping("/total")
public long getTotalBookings() {
    return service.getTotalBookings();
}
@GetMapping("/admin-dashboard")
public Map<String, Object> adminDashboard(@RequestParam String date) {
    return service.getAdminDashboard(LocalDate.parse(date));
}
@GetMapping("/smart-suggestion")
public String smartSuggestion(
        @RequestParam String mealType,
        @RequestParam String date
) {
    return service.getSmartSuggestion(mealType, LocalDate.parse(date));
}

@PostMapping("/predict")
public Map<String, Object> predict(@RequestBody Map<String, Object> request) {
    return aiService.callPythonAI(request);
}
}