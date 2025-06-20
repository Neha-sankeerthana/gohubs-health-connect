
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import GohubsLocator from './GohubsLocator';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-green-500 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          WELCOME TO GOHUBS – YOUR HEALTHCARE PARTNER
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in">
          BRINGING QUALITY HEALTHCARE TO YOUR DOORSTEP
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/auth?tab=signup">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 text-lg transition-all hover:scale-105"
            >
              JOIN NOW
            </Button>
          </Link>
          <Link to="/services">
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 text-lg transition-all hover:scale-105"
            >
              SERVICES
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <GohubsLocator />
        </div>
        
        <div className="mt-12 animate-bounce">
          <ArrowDown className="mx-auto h-8 w-8 text-white opacity-70" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
