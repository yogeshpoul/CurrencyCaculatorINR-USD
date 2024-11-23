package com.example.auth_api.services;

import org.springframework.stereotype.Service;

@Service
public class CurrencyConversionService {

    // Hardcoded exchange rate from INR to USD
    private static final double INR_TO_USD = 0.012;

    public double convertINRtoUSD(double amount) {
        // Convert INR to USD using the static rate
        return amount * INR_TO_USD;
    }
}