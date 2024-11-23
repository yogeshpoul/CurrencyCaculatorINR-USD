import React, { useState } from 'react';
import { API_URL } from '../config';

export const Dashboard = () => {
  // State to store the input amount, conversion result, and loading state
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  // Handle the currency conversion
  const handleConvertCurrency = async () => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    if (!amount || !token) {
      setError('Please enter an amount and ensure you are logged in.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Make the API request
      const response = await fetch(`${API_URL}/currency/convert-inr-to-usd?amount=${amount}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });
      console.log(response,token)

      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Failed to fetch data. Please try again.');
      }

      // Parse the response JSON
      const data = await response.json();
      setConvertedAmount(data); // Set the converted amount in the state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 centre">
      <h1 className="text-3xl mb-6">Currency Conversion (INR to USD)</h1>
      
      {/* Input for the amount */}
      <input
        type="number"
        value={amount}
        onChange={handleInputChange}
        className="p-2 mb-4 bg-gray-800 text-white border border-gray-700"
        placeholder="Enter amount in INR"
      />
      
      {/* Convert button */}
      <button
        onClick={handleConvertCurrency}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Convert
      </button>

      {/* Loading state */}
      {loading && <p className="mt-4 text-yellow-300">Converting...</p>}

      {/* Error state */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Display converted amount */}
      {convertedAmount !== null && !loading && !error && (
        <div className="mt-4">
          <h2 className="text-xl">Converted Amount</h2>
          <p className="text-2xl">USD: {convertedAmount}</p>
        </div>
      )}
    </div>
  );
};
