
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Baby, 
  Monitor 
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Heart,
      title: "Online Health Consultation",
      description: "Connect with certified doctors from the comfort of your home"
    },
    {
      icon: Phone,
      title: "24/7 Ambulance Service",
      description: "Fully equipped ambulances ready for emergency response"
    },
    {
      icon: MapPin,
      title: "Find Nearest Hospitals",
      description: "Locate the closest healthcare facilities in your area"
    },
    {
      icon: BookOpen,
      title: "Health Awareness",
      description: "Educational content and programs for better health"
    },
    {
      icon: Calendar,
      title: "Offline Appointment Booking",
      description: "Schedule appointments at partner hospitals"
    },
    {
      icon: Baby,
      title: "Maternal Care",
      description: "Specialized care offered by offline GOHUB centres"
    },
    {
      icon: Monitor,
      title: "Telemedicine Support",
      description: "Remote medical consultations and follow-ups"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Healthcare Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive healthcare solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all hover:border-blue-300 group cursor-pointer"
            >
              <service.icon className="h-10 w-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/services">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8"
            >
              Explore All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
