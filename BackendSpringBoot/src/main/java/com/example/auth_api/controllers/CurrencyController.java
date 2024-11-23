package com.example.auth_api.controllers;

import com.example.auth_api.services.CurrencyConversionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/currency")
public class CurrencyController {

    @Autowired
    private CurrencyConversionService currencyConversionService;

    // Endpoint to convert INR to USD
    @GetMapping("/convert-inr-to-usd")
    public double convertINRtoUSD(@RequestParam double amount) {
        return currencyConversionService.convertINRtoUSD(amount);
    }
}
