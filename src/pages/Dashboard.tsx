
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Calendar, 
  Heart, 
  Activity, 
  Phone, 
  FileText, 
  Clock,
  Weight,
  Ruler,
  Plus,
  Eye
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface HealthRecord {
  id: string;
  weight: number | null;
  height: number | null;
  blood_pressure: string | null;
  medical_history: string | null;
  consultation_notes: string | null;
  created_at: string;
}

interface Appointment {
  id: string;
  appointment_date: string;
  doctor_name: string;
  hospital_name: string;
  specialization: string;
  status: string;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({
    weight: '',
    height: '',
    blood_pressure: '',
    medical_history: '',
    consultation_notes: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      // Get user profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setUser({
          name: profile.full_name,
          email: user.email || '',
          phone: profile.phone
        });
      }

      // Fetch health records
      const { data: records } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (records) {
        setHealthRecords(records);
      }

      // Fetch appointments
      const { data: appointmentData } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (appointmentData) {
        setAppointments(appointmentData);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('health_records').insert({
        user_id: user.id,
        weight: newRecord.weight ? parseFloat(newRecord.weight) : null,
        height: newRecord.height ? parseFloat(newRecord.height) : null,
        blood_pressure: newRecord.blood_pressure || null,
        medical_history: newRecord.medical_history || null,
        consultation_notes: newRecord.consultation_notes || null
      });

      if (error) throw error;

      toast({
        title: "Health Record Added",
        description: "Your health record has been successfully saved.",
      });

      // Refresh health records
      const { data: records } = await supabase
        .from('health_records')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (records) {
        setHealthRecords(records);
      }

      setNewRecord({
        weight: '',
        height: '',
        blood_pressure: '',
        medical_history: '',
        consultation_notes: ''
      });
      setShowAddRecord(false);
    } catch (error) {
      console.error('Error adding health record:', error);
      toast({
        title: "Error",
        description: "Failed to add health record. Please try again.",
        variant: "destructive",
      });
    }
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'default';
      case 'scheduled':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const latestRecord = healthRecords[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100">Here's your comprehensive health dashboard</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="mt-4 md:mt-0 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{user.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Health Metrics */}
        {latestRecord && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Current Health Metrics</span>
              </CardTitle>
              <CardDescription>Latest recorded health indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {latestRecord.weight && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Weight className="h-5 w-5 text-blue-600" />
                      <Badge variant="default">Current</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="text-2xl font-bold">{latestRecord.weight} <span className="text-sm text-gray-500">kg</span></p>
                  </div>
                )}
                
                {latestRecord.height && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Ruler className="h-5 w-5 text-green-600" />
                      <Badge variant="default">Current</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Height</p>
                    <p className="text-2xl font-bold">{latestRecord.height} <span className="text-sm text-gray-500">cm</span></p>
                  </div>
                )}

                {latestRecord.weight && latestRecord.height && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <Badge variant="default">Calculated</Badge>
                    </div>
                    <p className="text-sm text-gray-600">BMI</p>
                    <p className="text-2xl font-bold">{calculateBMI(latestRecord.weight, latestRecord.height)}</p>
                  </div>
                )}

                {latestRecord.blood_pressure && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      <Badge variant="default">Current</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Blood Pressure</p>
                    <p className="text-2xl font-bold">{latestRecord.blood_pressure} <span className="text-sm text-gray-500">mmHg</span></p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Health Records History */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Health Records History</span>
                </CardTitle>
                <CardDescription>Your complete health tracking history</CardDescription>
              </div>
              <Dialog open={showAddRecord} onOpenChange={setShowAddRecord}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Record
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Health Record</DialogTitle>
                    <DialogDescription>
                      Record your current health metrics and medical information
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddRecord} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          step="0.1"
                          value={newRecord.weight}
                          onChange={(e) => setNewRecord({...newRecord, weight: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          step="0.1"
                          value={newRecord.height}
                          onChange={(e) => setNewRecord({...newRecord, height: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="blood_pressure">Blood Pressure</Label>
                      <Input
                        id="blood_pressure"
                        name="blood_pressure"
                        placeholder="e.g., 120/80"
                        value={newRecord.blood_pressure}
                        onChange={(e) => setNewRecord({...newRecord, blood_pressure: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="medical_history">Medical History</Label>
                      <Textarea
                        id="medical_history"
                        name="medical_history"
                        placeholder="Any relevant medical history or conditions"
                        value={newRecord.medical_history}
                        onChange={(e) => setNewRecord({...newRecord, medical_history: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="consultation_notes">Consultation Notes</Label>
                      <Textarea
                        id="consultation_notes"
                        name="consultation_notes"
                        placeholder="Notes from recent consultations or symptoms"
                        value={newRecord.consultation_notes}
                        onChange={(e) => setNewRecord({...newRecord, consultation_notes: e.target.value})}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Save Health Record
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {healthRecords.length > 0 ? (
              <div className="space-y-4">
                {healthRecords.map((record, index) => (
                  <div key={record.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {new Date(record.created_at).toLocaleDateString()}
                        </span>
                        {index === 0 && <Badge variant="secondary">Latest</Badge>}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 mb-3">
                      {record.weight && (
                        <div>
                          <p className="text-xs text-gray-500">Weight</p>
                          <p className="font-semibold">{record.weight} kg</p>
                        </div>
                      )}
                      {record.height && (
                        <div>
                          <p className="text-xs text-gray-500">Height</p>
                          <p className="font-semibold">{record.height} cm</p>
                        </div>
                      )}
                      {record.blood_pressure && (
                        <div>
                          <p className="text-xs text-gray-500">Blood Pressure</p>
                          <p className="font-semibold">{record.blood_pressure} mmHg</p>
                        </div>
                      )}
                      {record.weight && record.height && (
                        <div>
                          <p className="text-xs text-gray-500">BMI</p>
                          <p className="font-semibold">{calculateBMI(record.weight, record.height)}</p>
                        </div>
                      )}
                    </div>
                    
                    {(record.medical_history || record.consultation_notes) && (
                      <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                        {record.medical_history && (
                          <div className="mb-2">
                            <p className="text-xs text-gray-500 font-medium">Medical History:</p>
                            <p className="text-sm text-gray-700">{record.medical_history}</p>
                          </div>
                        )}
                        {record.consultation_notes && (
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Consultation Notes:</p>
                            <p className="text-sm text-gray-700">{record.consultation_notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No health records yet. Add your first record to start tracking your health.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointments History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Appointment History</span>
            </CardTitle>
            <CardDescription>Your medical consultation history</CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {new Date(appointment.appointment_date).toLocaleString()}
                        </span>
                        <Badge variant={getStatusBadgeVariant(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Doctor</p>
                        <p className="font-semibold">{appointment.doctor_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hospital</p>
                        <p className="font-semibold">{appointment.hospital_name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="font-semibold">{appointment.specialization}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No appointments yet. Book your first consultation to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
