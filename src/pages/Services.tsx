
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import OnlineConsultation from '@/components/services/OnlineConsultation';
import AmbulanceService from '@/components/services/AmbulanceService';
import NearestHospitals from '@/components/services/NearestHospitals';
import HealthAwareness from '@/components/services/HealthAwareness';
import AppointmentBooking from '@/components/services/AppointmentBooking';
import MaternalCare from '@/components/services/MaternalCare';
import TelemedicineSupport from '@/components/services/TelemedicineSupport';
import { 
  Heart, 
  Phone, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Baby, 
  Monitor,
  ArrowLeft
} from 'lucide-react';

const Services = () => {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      id: 'consultation',
      icon: Heart,
      title: "Online Health Consultation",
      description: "Connect with certified doctors through video calls, chat, or phone consultations. Get medical advice, prescriptions, and follow-up care from licensed healthcare professionals.",
      component: <OnlineConsultation />
    },
    {
      id: 'ambulance',
      icon: Phone,
      title: "24/7 Ambulance Service (Fully Equipped)",
      description: "Emergency ambulance services available round the clock with advanced life support equipment, trained paramedics, and GPS tracking for fastest response times.",
      component: <AmbulanceService />
    },
    {
      id: 'hospitals',
      icon: MapPin,
      title: "Find Nearest Hospitals",
      description: "Locate the closest healthcare facilities based on your location. Get directions, contact information, and real-time availability of services.",
      component: <NearestHospitals />
    },
    {
      id: 'awareness',
      icon: BookOpen,
      title: "Health Awareness",
      description: "Educational programs, health tips, preventive care information, and wellness content to help you maintain a healthy lifestyle.",
      component: <HealthAwareness />
    },
    {
      id: 'appointments',
      icon: Calendar,
      title: "Offline Appointment Booking in Hospitals",
      description: "Schedule appointments with specialists and general practitioners at partner hospitals. Choose convenient time slots and receive confirmation.",
      component: <AppointmentBooking />
    },
    {
      id: 'maternal',
      icon: Baby,
      title: "Maternal Care Offered by Offline GOHUB Centre",
      description: "Comprehensive maternal healthcare services including prenatal care, postnatal support, nutrition guidance, and infant care at our physical centers.",
      component: <MaternalCare />
    },
    {
      id: 'telemedicine',
      icon: Monitor,
      title: "Telemedicine Support",
      description: "Remote monitoring, digital health records, medication reminders, and continuous care coordination for chronic conditions and ongoing treatments.",
      component: <TelemedicineSupport />
    }
  ];

  if (activeService) {
    const service = services.find(s => s.id === activeService);
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <Button 
              onClick={() => setActiveService(null)}
              variant="outline"
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Services
            </Button>
            {service?.component}
          </div>
        </div>
      </div>
    );
  }

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
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg cursor-pointer" onClick={() => setActiveService(service.id)}>
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
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Access Service
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
