import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllProperty = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Reusing the public route so Admin can see all active listings
    axios.get('http://localhost:8000/api/user/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow mb-6"
          >
            <span className="text-lg">←</span>
            Back to Dashboard
          </Link>
          
          <h2 className="text-3xl font-bold text-gray-900 mt-4">
            All Properties in System
          </h2>
          <p className="mt-2 text-gray-600">
            View and monitor all active property listings
          </p>
        </div>

        {/* Properties List */}
        {properties.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {properties.map(prop => (
                <li 
                  key={prop._id} 
                  className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {prop.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {prop.location}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        ₹{prop.rentAmount}/mo
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Properties Listed
              </h3>
              <p className="text-gray-500 text-sm">
                No properties have been listed in the system yet.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperty;