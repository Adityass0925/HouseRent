import React from 'react';
import { Link } from 'react-router-dom';

const AllBookings = () => (
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
          All System Bookings
        </h2>
        <p className="mt-2 text-gray-600">
          Monitor and manage all booking activity across the platform
        </p>
      </div>

      {/* Empty State */}
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-500 text-sm">
            System bookings will appear here once renters start making reservations.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AllBookings;