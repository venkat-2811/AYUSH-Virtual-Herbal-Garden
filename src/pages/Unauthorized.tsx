
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ayush-light p-4">
      <div className="bg-white rounded-lg shadow-md border border-herb-100 max-w-md w-full p-8 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-herb-50 rounded-full mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-8 w-8 text-herb-500"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-herb-700 mb-4">Access Denied</h1>
        
        <p className="text-herb-600 mb-6">
          You do not have the required permissions to access this page.
          Please contact an administrator if you believe this is an error.
        </p>
        
        <div className="flex flex-col gap-2">
          <Link to="/">
            <Button variant="default" className="w-full bg-herb-500 hover:bg-herb-600">
              Return to Home
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant="outline" className="w-full border-herb-200 text-herb-700">
              Login with Different Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
