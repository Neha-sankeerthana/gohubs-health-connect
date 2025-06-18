
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Shield, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      <Hero />
      <ServicesSection />
      
      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Phone className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Emergency Care</h3>
            <p className="text-gray-600">24/7 emergency services with immediate response</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Shield className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Trusted Care</h3>
            <p className="text-gray-600">Quality healthcare with certified professionals</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <Heart className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Comprehensive</h3>
            <p className="text-gray-600">Complete healthcare solutions under one roof</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">GOHUBS</h3>
          <p className="text-blue-200 mb-4">Going With Health Hubs</p>
          <p className="text-sm text-blue-300">© 2024 GOHUBS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
