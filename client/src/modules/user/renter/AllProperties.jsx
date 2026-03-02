import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AllPropertiesCards from '../AllPropertiesCards';

const RenterAllProperties = () => {
  const [properties, setProperties] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/properties');
        setProperties(response.data);
      } catch (error) {
        setMessage('Error fetching properties');
      }
    };
    fetchProperties();
  }, []);

  const handleBook = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:8000/api/user/book', { propertyId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Booking request sent successfully!');
    } catch (error) {
      alert('Failed to book property. Make sure you are logged in.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          to="/renter"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg shadow-sm transition-all duration-150 mb-4"
        >
          ← Back to Dashboard
        </Link>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Available Properties for Rent
        </h2>
        <p className="mt-1 text-gray-500 text-sm">Browse and book your next home.</p>
      </div>

      {/* Error Message */}
      {message && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {message}
        </div>
      )}

      {/* Property Grid */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(prop => (
            <AllPropertiesCards key={prop._id} property={prop} onBook={handleBook} userType="renter" />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center bg-white border border-dashed border-gray-200 rounded-2xl py-20 px-8 text-center shadow-sm">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-lg font-semibold text-gray-400 mb-1">No properties available right now</h3>
          <p className="text-sm text-gray-400">Check back soon — new listings are added regularly.</p>
        </div>
      )}
    </div>
  );
};

export default RenterAllProperties;