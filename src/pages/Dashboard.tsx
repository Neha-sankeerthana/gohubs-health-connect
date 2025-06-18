
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Calendar, 
  Heart, 
  Activity, 
  Phone, 
  FileText, 
  Clock,
  TrendingUp,
  Weight,
  Ruler
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface UserData {
  name: string;
  email: string;
  phone: string;
}

interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  icon: any;
}

interface Consultation {
  id: string;
  date: string;
  doctor: string;
  type: string;
  status: 'completed' | 'upcoming' | 'cancelled';
  diagnosis?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const healthMetrics: HealthMetric[] = [
    {
      label: "Weight",
      value: "72",
      unit: "kg",
      status: "normal",
      icon: Weight
    },
    {
      label: "Height",
      value: "175",
      unit: "cm",
      status: "normal",
      icon: Ruler
    },
    {
      label: "BMI",
      value: "23.5",
      unit: "",
      status: "normal",
      icon: Activity
    },
    {
      label: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal",
      icon: Heart
    }
  ];

  const consultations: Consultation[] = [
    {
      id: "1",
      date: "2024-06-15",
      doctor: "Dr. Sarah Johnson",
      type: "General Checkup",
      status: "completed",
      diagnosis: "Regular health checkup completed. All parameters normal."
    },
    {
      id: "2",
      date: "2024-06-20",
      doctor: "Dr. Michael Chen",
      type: "Cardiology Consultation",
      status: "upcoming"
    },
    {
      id: "3",
      date: "2024-06-10",
      doctor: "Dr. Emily Davis",
      type: "Dermatology",
      status: "completed",
      diagnosis: "Skin condition treated successfully. Follow-up in 2 weeks."
    }
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <p className="text-blue-100">Here's your health dashboard overview</p>
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

        {/* Health Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Health Metrics</span>
            </CardTitle>
            <CardDescription>Your key health indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthMetrics.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className="h-5 w-5 text-blue-600" />
                    <Badge 
                      variant={metric.status === 'normal' ? 'default' : 
                              metric.status === 'warning' ? 'secondary' : 'destructive'}
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold">
                    {metric.value} <span className="text-sm text-gray-500">{metric.unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consultations History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Recent Consultations</span>
            </CardTitle>
            <CardDescription>Your medical consultation history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <div key={consultation.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(consultation.date).toLocaleDateString()}
                      </span>
                      <Badge 
                        variant={consultation.status === 'completed' ? 'default' : 
                                consultation.status === 'upcoming' ? 'secondary' : 'destructive'}
                      >
                        {consultation.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 mb-1">{consultation.type}</h4>
                  <p className="text-sm text-gray-600 mb-2">with {consultation.doctor}</p>
                  
                  {consultation.diagnosis && (
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800">
                        <strong>Diagnosis:</strong> {consultation.diagnosis}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View All Consultations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
