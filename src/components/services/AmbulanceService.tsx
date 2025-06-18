
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, Clock } from 'lucide-react';

const AmbulanceService = () => {
  const handleEmergencyCall = () => {
    window.open('tel:+919182848430');
  };

  return (
    <Card className="bg-red-50 border-red-200">
      <CardHeader className="text-center">
        <CardTitle className="text-red-600 text-2xl">🚑 Emergency Ambulance Service</CardTitle>
        <CardDescription className="text-lg">Available 24/7 with fully equipped ambulances</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-6">
        <div className="bg-white p-6 rounded-lg border-2 border-red-200">
          <h3 className="text-xl font-bold text-red-600 mb-4">Emergency Hotline</h3>
          <p className="text-3xl font-bold text-gray-800 mb-4">+91 91828 48430</p>
          <Button 
            onClick={handleEmergencyCall}
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4"
            size="lg"
          >
            <Phone className="h-6 w-6 mr-2" />
            Call Emergency Now
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border">
            <Clock className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-semibold">24/7 Available</h4>
            <p className="text-sm text-gray-600">Round the clock emergency service</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-semibold">GPS Tracking</h4>
            <p className="text-sm text-gray-600">Real-time location tracking</p>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <Phone className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-semibold">Trained Staff</h4>
            <p className="text-sm text-gray-600">Certified paramedics onboard</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbulanceService;
