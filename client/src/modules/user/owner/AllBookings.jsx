import React from 'react';
import { Link } from 'react-router-dom';

const AllBookings = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto">
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
          Bookings on My Properties
        </h2>
        <p className="mt-2 text-gray-600">
          View and manage booking requests from renters
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Active Bookings
          </h3>
          <p className="text-gray-500 text-sm">
            No active booking requests yet. When renters book your properties, they'll appear here.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AllBookings;