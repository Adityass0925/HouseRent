import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AllPropertiesCards from '../AllPropertiesCards';

const OwnerAllProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/owner/properties', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching your properties', error);
      }
    };
    fetchMyProperties();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link 
            to="/owner" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow mb-6"
          >
            <span className="text-lg">←</span>
            Back to Dashboard
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            My Property Listings
          </h2>
          <p className="mt-2 text-gray-600">
            Manage and view all your listed properties
          </p>
        </div>

        {/* Properties Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(prop => (
              <AllPropertiesCards key={prop._id} property={prop} userType="owner" />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center max-w-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Properties Yet
              </h3>
              <p className="text-gray-500 text-sm">
                You haven't listed any properties yet. Start by adding your first property listing.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerAllProperties;