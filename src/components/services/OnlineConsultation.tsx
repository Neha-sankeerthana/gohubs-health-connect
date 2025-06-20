
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Clock, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ConsultationFormData {
  doctorName: string;
  hospital: string;
  patientName: string;
  symptoms: string;
  timeSlot: string;
  phone: string;
}

const OnlineConsultation = () => {
  const [consultationData, setConsultationData] = useState<ConsultationFormData>({
    doctorName: '',
    hospital: '',
    patientName: '',
    symptoms: '',
    timeSlot: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const { toast } = useToast();

  const nearbyDoctors = [
    { name: "Dr. Rajesh Kumar", specialization: "General Medicine", hospital: "Apollo Hospital", distance: "2.5 km", phone: "+91 9182848431" },
    { name: "Dr. Priya Sharma", specialization: "Cardiology", hospital: "KIMS Hospital", distance: "3.2 km", phone: "+91 9182848432" },
    { name: "Dr. Mohan Rao", specialization: "Pediatrics", hospital: "Rainbow Hospital", distance: "1.8 km", phone: "+91 9182848433" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConsultationData({ ...consultationData, [e.target.name]: e.target.value });
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to book a consultation.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from('appointments').insert({
        user_id: user.id,
        doctor_name: consultationData.doctorName,
        hospital_name: consultationData.hospital,
        specialization: nearbyDoctors.find(d => d.name === consultationData.doctorName)?.specialization || '',
        appointment_date: consultationData.timeSlot,
        status: 'scheduled'
      });

      if (error) throw error;

      toast({
        title: "Consultation Booked",
        description: "Your consultation has been successfully scheduled.",
      });

      setConsultationData({
        doctorName: '',
        hospital: '',
        patientName: '',
        symptoms: '',
        timeSlot: '',
        phone: ''
      });
      setOpenDialog(null);
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast({
        title: "Booking Failed",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openConsultationForm = (doctor: any) => {
    setConsultationData({
      ...consultationData,
      doctorName: doctor.name,
      hospital: doctor.hospital
    });
    setOpenDialog(doctor.name);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nearby Doctors & Hospitals</CardTitle>
          <CardDescription>Available doctors in your area with online consultation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nearbyDoctors.map((doctor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{doctor.name}</h4>
                    <p className="text-sm text-gray-600 mb-1">{doctor.specialization}</p>
                    <p className="text-sm text-blue-600 flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {doctor.hospital} - {doctor.distance}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => window.open(`tel:${doctor.phone}`)}
                      className="bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    
                    <Dialog open={openDialog === doctor.name} onOpenChange={(open) => setOpenDialog(open ? doctor.name : null)}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => openConsultationForm(doctor)}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Consultation
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Book Online Consultation</DialogTitle>
                          <DialogDescription>
                            Schedule a consultation with {doctor.name} at {doctor.hospital}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleConsultationSubmit} className="space-y-4">
                          <div>
                            <Label htmlFor="patientName">Patient Name</Label>
                            <Input
                              id="patientName"
                              name="patientName"
                              value={consultationData.patientName}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="symptoms">Symptoms/Reason</Label>
                            <Textarea
                              id="symptoms"
                              name="symptoms"
                              value={consultationData.symptoms}
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
                              value={consultationData.phone}
                              onChange={handleInputChange}
                              placeholder="+91 XXXXXXXXXX"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="timeSlot">Preferred Date & Time</Label>
                            <Input
                              id="timeSlot"
                              name="timeSlot"
                              type="datetime-local"
                              value={consultationData.timeSlot}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <Button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Booking...' : 'Book Consultation'}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnlineConsultation;
