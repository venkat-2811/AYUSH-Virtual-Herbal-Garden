
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-ayush-light">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-full shadow-sm">
              <Leaf className="h-12 w-12 text-herb-500" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-herb-700 text-center mb-8">
            About AYUSH Virtual Herbal Garden
          </h1>
          
          <div className="bg-white rounded-lg shadow-md border border-herb-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-herb-700 mb-4">Our Mission</h2>
            <p className="text-herb-600 mb-6">
              The AYUSH Virtual Herbal Garden is an innovative digital platform dedicated to 
              preserving and spreading knowledge about traditional medicinal herbs. Our mission 
              is to create an accessible, educational resource that bridges the gap between ancient 
              herbal wisdom and modern technology.
            </p>
            
            <h2 className="text-2xl font-bold text-herb-700 mb-4">What We Offer</h2>
            <ul className="list-disc pl-5 mb-6 space-y-2 text-herb-600">
              <li>
                <span className="font-medium">Interactive 3D Models:</span> Explore detailed 
                three-dimensional representations of medicinal plants to better understand their 
                structure and characteristics.
              </li>
              <li>
                <span className="font-medium">AI-Powered Insights:</span> Access intelligent 
                information about herbs, their properties, and cultivation methods through our 
                advanced AI system.
              </li>
              <li>
                <span className="font-medium">Comprehensive Database:</span> Browse our extensive 
                collection of herbs with detailed information on uses, properties, and origins.
              </li>
              <li>
                <span className="font-medium">Expert Chatbot:</span> Get answers to your questions 
                about herbal medicine, gardening techniques, and traditional uses from our 
                specialized chatbot.
              </li>
              <li>
                <span className="font-medium">Search & Filter:</span> Find specific herbs based on 
                various criteria such as region, uses, or chemical composition.
              </li>
            </ul>
            
            <h2 className="text-2xl font-bold text-herb-700 mb-4">Our Vision</h2>
            <p className="text-herb-600">
              We envision a world where traditional herbal knowledge is preserved, accessible, 
              and integrated with modern scientific understanding. By combining cutting-edge 
              technology with ancient wisdom, we aim to promote sustainable practices, natural 
              wellness, and a deeper appreciation for the plant world around us.
            </p>
          </div>
          
          <div className="flex justify-center">
            <Link to="/explore">
              <Button className="bg-herb-500 hover:bg-herb-600">
                <Leaf className="mr-2 h-5 w-5" />
                Start Exploring the Garden
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
