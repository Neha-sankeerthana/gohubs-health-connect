
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { 
  Heart, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Baby, 
  Monitor,
  Clock,
  Shield,
  Users
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Online Health Consultation",
      description: "Connect with certified doctors through video calls, chat, or phone consultations. Get medical advice, prescriptions, and follow-up care from licensed healthcare professionals.",
      features: ["Video Consultations", "Instant Chat", "Digital Prescriptions", "Follow-up Care"]
    },
    {
      icon: Phone,
      title: "24/7 Ambulance Service (Fully Equipped)",
      description: "Emergency ambulance services available round the clock with advanced life support equipment, trained paramedics, and GPS tracking for fastest response times.",
      features: ["Advanced Life Support", "Trained Paramedics", "GPS Tracking", "24/7 Availability"]
    },
    {
      icon: MapPin,
      title: "Find Nearest Hospitals",
      description: "Locate the closest healthcare facilities based on your location. Get directions, contact information, and real-time availability of services.",
      features: ["Real-time Location", "Hospital Directory", "Service Availability", "Navigation Support"]
    },
    {
      icon: BookOpen,
      title: "Health Awareness",
      description: "Educational programs, health tips, preventive care information, and wellness content to help you maintain a healthy lifestyle.",
      features: ["Health Education", "Preventive Care", "Wellness Tips", "Regular Updates"]
    },
    {
      icon: Calendar,
      title: "Offline Appointment Booking in Hospitals",
      description: "Schedule appointments with specialists and general practitioners at partner hospitals. Choose convenient time slots and receive confirmation.",
      features: ["Specialist Booking", "Time Slot Selection", "Instant Confirmation", "Reminder Notifications"]
    },
    {
      icon: Baby,
      title: "Maternal Care Offered by Offline GOHUB Centre",
      description: "Comprehensive maternal healthcare services including prenatal care, postnatal support, nutrition guidance, and infant care at our physical centers.",
      features: ["Prenatal Care", "Postnatal Support", "Nutrition Guidance", "Infant Care"]
    },
    {
      icon: Monitor,
      title: "Telemedicine Support",
      description: "Remote monitoring, digital health records, medication reminders, and continuous care coordination for chronic conditions and ongoing treatments.",
      features: ["Remote Monitoring", "Digital Records", "Medication Reminders", "Care Coordination"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Healthcare Services</h1>
          <p className="text-xl text-blue-100">Comprehensive healthcare solutions for every need</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <service.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Key Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-200 mb-8">
            Join thousands of satisfied patients who trust GOHUBS for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                Sign Up Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
