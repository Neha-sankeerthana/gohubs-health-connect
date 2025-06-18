
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Clock } from 'lucide-react';

const OnlineConsultation = () => {
  const [formData, setFormData] = useState({
    name: '',
    symptoms: '',
    timeSlot: '',
    phone: ''
  });

  const nearbyDoctors = [
    { name: "Dr. Rajesh Kumar", specialization: "General Medicine", hospital: "Apollo Hospital", distance: "2.5 km", phone: "+91 9182848431" },
    { name: "Dr. Priya Sharma", specialization: "Cardiology", hospital: "KIMS Hospital", distance: "3.2 km", phone: "+91 9182848432" },
    { name: "Dr. Mohan Rao", specialization: "Pediatrics", hospital: "Rainbow Hospital", distance: "1.8 km", phone: "+91 9182848433" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation booked:', formData);
    alert('Consultation request submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Online Health Consultation</CardTitle>
          <CardDescription>Book your consultation with certified doctors</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="symptoms">Describe Your Symptoms</Label>
              <Input
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleInputChange}
                placeholder="Brief description of your health concern"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXXXXXXX"
                required
              />
            </div>
            <div>
              <Label htmlFor="timeSlot">Preferred Time Slot</Label>
              <Input
                id="timeSlot"
                name="timeSlot"
                type="datetime-local"
                value={formData.timeSlot}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Book Consultation
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nearby Doctors & Hospitals</CardTitle>
          <CardDescription>Available doctors in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyDoctors.map((doctor, index) => (
              <div key={index} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{doctor.name}</h4>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  <p className="text-sm text-blue-600 flex items-center"><MapPin className="h-4 w-4 mr-1" />{doctor.hospital} - {doctor.distance}</p>
                </div>
                <Button
                  onClick={() => window.open(`tel:${doctor.phone}`)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnlineConsultation;
