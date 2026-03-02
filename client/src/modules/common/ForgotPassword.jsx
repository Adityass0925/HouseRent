import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div className="w-full max-w-md">
      {/* Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-indigo-100 text-sm">
            We'll help you recover your account
          </p>
        </div>

        {/* Content Section */}
        <div className="px-8 py-10">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg 
                className="w-5 h-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clipRule="evenodd" 
                />
              </svg>
              <p className="text-sm text-amber-800">
                Please contact our support team to reset your password. They will assist you with account recovery.
              </p>
            </div>
          </div>

          {/* Support Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Contact Support
            </h3>
            <p className="text-sm text-gray-600">
              Email: <span className="font-medium text-indigo-600">support@example.com</span>
            </p>
          </div>

          {/* Back to Login Link */}
          <Link 
            to="/login" 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 transition-all duration-200"
          >
            <span className="text-lg">←</span>
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            Need immediate assistance? Contact us at{' '}
            <span className="font-medium text-gray-700">1-800-SUPPORT</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ForgotPassword;