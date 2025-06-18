
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const handleEmergencyCall = () => {
    window.location.href = 'tel:+919182848430';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white rounded-full p-2">
              <span className="font-bold text-lg">G</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-900">GOHUBS</h1>
              <p className="text-xs text-gray-600">Going With Health Hubs</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Button 
              onClick={handleEmergencyCall}
              className="bg-red-500 hover:bg-red-600 text-white flex items-center space-x-2"
            >
              <Phone className="h-4 w-4" />
              <span>Emergency</span>
            </Button>
            <Link to="/auth">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Signup/Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              onClick={handleEmergencyCall}
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Link to="/auth">
              <Button size="sm" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
