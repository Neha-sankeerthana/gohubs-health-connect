
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Clock, Truck } from 'lucide-react';

const TelemedicineSupport = () => {
  const medicalStores = [
    {
      name: "Apollo Pharmacy",
      address: "Dwarakanagar, Visakhapatnam",
      distance: "1.2 km",
      phone: "+91 91828 48431",
      deliveryTime: "30 mins",
      available: true
    },
    {
      name: "MedPlus",
      address: "MVP Colony, Visakhapatnam",
      distance: "0.8 km",
      phone: "+91 91828 48432",
      deliveryTime: "25 mins",
      available: true
    },
    {
      name: "Netmeds Pharmacy",
      address: "Siripuram, Visakhapatnam",
      distance: "2.1 km",
      phone: "+91 91828 48433",
      deliveryTime: "45 mins",
      available: false
    }
  ];

  const medicalStaff = [
    {
      name: "Nurse Priya Reddy",
      specialization: "Home Care Nursing",
      experience: "8 years",
      phone: "+91 91828 48434",
      availability: "Available now"
    },
    {
      name: "Physiotherapist Ravi Kumar",
      specialization: "Home Physiotherapy",
      experience: "12 years",
      phone: "+91 91828 48435",
      availability: "Available after 2 PM"
    },
    {
      name: "Lab Technician Sita Devi",
      specialization: "Home Sample Collection",
      experience: "6 years",
      phone: "+91 91828 48436",
      availability: "Available now"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telemedicine Support</CardTitle>
        <CardDescription>Medical stores and staff support for home delivery and care</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Medical Stores Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Truck className="h-5 w-5 mr-2 text-blue-600" />
            Nearby Medical Stores (Home Delivery)
          </h3>
          <div className="grid gap-4">
            {medicalStores.map((store, index) => (
              <div key={index} className={`border rounded-lg p-4 ${!store.available ? 'opacity-60' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{store.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {store.address} • {store.distance}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-green-600 flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Delivery: {store.deliveryTime}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full ${store.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {store.available ? 'Available' : 'Closed'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col gap-2">
                    <Button
                      onClick={() => window.open(`tel:${store.phone}`)}
                      disabled={!store.available}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Store
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Staff Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-green-600" />
            Available Medical Staff (Home Visits)
          </h3>
          <div className="grid gap-4">
            {medicalStaff.map((staff, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{staff.name}</h4>
                    <p className="text-blue-600 font-medium">{staff.specialization}</p>
                    <p className="text-sm text-gray-600 mt-1">{staff.experience} experience</p>
                    <span className="text-sm text-green-600 font-medium mt-2 block">
                      {staff.availability}
                    </span>
                  </div>
                  <Button
                    onClick={() => window.open(`tel:${staff.phone}`)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call for Support
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-800 mb-4">24/7 Emergency Telemedicine Support</h3>
          <p className="text-gray-700 mb-4">For urgent medical consultations and emergency medicine delivery</p>
          <Button
            onClick={() => window.open('tel:+919182848430')}
            className="bg-red-600 hover:bg-red-700"
            size="lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call Emergency Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TelemedicineSupport;
