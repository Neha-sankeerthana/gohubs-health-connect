
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Clock } from 'lucide-react';

const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      hospital: "Apollo Hospital",
      experience: "15 years",
      rating: 4.8,
      nextAvailable: "Tomorrow 10:00 AM",
      distance: "2.5 km"
    },
    {
      id: 2,
      name: "Dr. Priya Sharma",
      specialization: "Gynecologist",
      hospital: "KIMS Hospital",
      experience: "12 years",
      rating: 4.9,
      nextAvailable: "Today 4:00 PM",
      distance: "3.2 km"
    },
    {
      id: 3,
      name: "Dr. Mohan Rao",
      specialization: "Pediatrician",
      hospital: "Rainbow Hospital",
      experience: "18 years",
      rating: 4.7,
      nextAvailable: "Tomorrow 2:00 PM",
      distance: "1.8 km"
    },
    {
      id: 4,
      name: "Dr. Lakshmi Devi",
      specialization: "Dermatologist",
      hospital: "Care Hospital",
      experience: "10 years",
      rating: 4.6,
      nextAvailable: "Day after tomorrow 11:00 AM",
      distance: "4.1 km"
    }
  ];

  const handleBookAppointment = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId);
    alert(`Appointment booking request sent for ${doctor?.name}. You will receive a confirmation call shortly.`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Offline Appointment Booking</CardTitle>
        <CardDescription>Book appointments with specialists at nearby hospitals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
                  <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {doctor.hospital} • {doctor.distance}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>⭐ {doctor.rating}</span>
                    <span>{doctor.experience} experience</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium mt-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Next available: {doctor.nextAvailable}
                  </p>
                </div>
                <div className="ml-4">
                  <Button
                    onClick={() => handleBookAppointment(doctor.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentBooking;
