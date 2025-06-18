
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin } from 'lucide-react';

const MaternalCare = () => {
  const facilities = [
    {
      title: "Prenatal Care Unit",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
      description: "Comprehensive prenatal checkups and monitoring"
    },
    {
      title: "Delivery Room",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center",
      description: "Modern delivery facilities with expert medical staff"
    },
    {
      title: "Newborn Care",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop&crop=center",
      description: "Specialized newborn care and monitoring"
    },
    {
      title: "Nursing Support",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop&crop=center",
      description: "24/7 nursing support for mothers and babies"
    },
    {
      title: "Lactation Counseling",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop&crop=center",
      description: "Expert lactation support and counseling"
    },
    {
      title: "Postnatal Care",
      image: "https://images.unsplash.com/photo-1576669801820-8b968f4c8fd1?w=400&h=300&fit=crop&crop=center",
      description: "Comprehensive postnatal care and recovery support"
    }
  ];

  const services = [
    "Regular prenatal checkups and monitoring",
    "Ultrasound and diagnostic services",
    "Nutritional counseling for expecting mothers",
    "Childbirth education classes",
    "Emergency delivery services",
    "Postpartum depression counseling",
    "Infant care and feeding guidance",
    "Family planning consultations"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maternal Care by GOHUB Centre</CardTitle>
        <CardDescription>Comprehensive maternal healthcare services at our offline centers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {facilities.map((facility, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold mb-2">{facility.title}</h4>
                <p className="text-sm text-gray-600">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Our Maternal Care Services</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {services.map((service, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-pink-800 mb-4">Contact GOHUB Maternal Care Centre</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-2 text-pink-600" />
              <span>GOHUB Centre, MVP Colony, Visakhapatnam</span>
            </div>
            <Button
              onClick={() => window.open('tel:+919182848430')}
              className="bg-pink-600 hover:bg-pink-700"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call for Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaternalCare;
