
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Flower, MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-ayush-light">
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('/herbs/hero.jpg')", 
            opacity: 0.2,
          }}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-full mb-6">
              <Leaf className="h-10 w-10 text-herb-500" />
            </div>
            
            <h1 className="text-5xl font-bold text-herb-800 mb-6">
              AYUSH Virtual Herbal Garden
            </h1>
            
            <p className="text-xl text-herb-700 mb-8">
              Explore the world of traditional medicinal herbs with interactive 3D models, 
              AI-powered insights, and a wealth of knowledge about herbal medicine.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className="bg-herb-500 hover:bg-herb-600">
                  <Flower className="mr-2 h-5 w-5" /> Explore Garden
                </Button>
              </Link>
              
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-herb-300 text-herb-700 hover:bg-herb-50">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-herb-700 mb-12">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-ayush-light rounded-lg p-6 shadow-md">
              <div className="h-12 w-12 bg-herb-100 rounded-lg flex items-center justify-center mb-4">
                <Flower className="h-6 w-6 text-herb-500" />
              </div>
              <h3 className="text-xl font-semibold text-herb-700 mb-2">
                3D Herb Models
              </h3>
              <p className="text-herb-600">
                Explore detailed 3D models of medicinal herbs, allowing you to examine their structure from all angles.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-ayush-light rounded-lg p-6 shadow-md">
              <div className="h-12 w-12 bg-herb-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-herb-500">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-herb-700 mb-2">
                AI-Powered Insights
              </h3>
              <p className="text-herb-600">
                Get intelligent information about herbs, their properties, and how to cultivate them using our AI system.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-ayush-light rounded-lg p-6 shadow-md">
              <div className="h-12 w-12 bg-herb-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-herb-500" />
              </div>
              <h3 className="text-xl font-semibold text-herb-700 mb-2">
                Herb Expert Chatbot
              </h3>
              <p className="text-herb-600">
                Ask questions and get expert answers about herbal medicine, gardening tips, and more with our specialized chatbot.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-herb-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-herb-700 mb-6">
            Start Your Herbal Journey Today
          </h2>
          
          <p className="text-lg text-herb-600 max-w-2xl mx-auto mb-8">
            Join our community of herbal enthusiasts, gardeners, and traditional medicine practitioners
            to learn, share, and grow together.
          </p>
          
          <Link to="/login">
            <Button size="lg" className="bg-herb-500 hover:bg-herb-600">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-herb-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-herb-500">
            © {new Date().getFullYear()} AYUSH Virtual Herbal Garden. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
