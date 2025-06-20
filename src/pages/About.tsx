import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import FeedbackForm from '@/components/FeedbackForm';
import { MessageCircle } from 'lucide-react';

const About = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const founders = [
    {
      name: "Neha Sankeerthana Tadi",
      role: "Aspiring student of AI/ML",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c2c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Kushbu Yadav Ommi",
      role: "Aspiring student of AI/ML",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Samatha Teddu",
      role: "Aspiring student of AI/ML",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Navya Rayala",
      role: "Aspiring student of AI/ML",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
    },
    {
      name: "Kusuma Dadi",
      role: "Aspiring student of AI/ML",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    }
  ];

  const surveyPhotos = [
    {
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      caption: "Community Interview"
    },
    {
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
      caption: "Health Camp Observation"
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      caption: "Village Health Assessment"
    },
    {
      image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
      caption: "Healthcare Documentation"
    },
    {
      image: "https://images.unsplash.com/photo-1551601651-bc60e51d6ba2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      caption: "Community Outreach"
    },
    {
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
      caption: "Field Research"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Our Motto Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            From Remote to Rescued – Timely Healthcare for All
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </section>

        {/* Founders Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Meet the Team Behind GOHUBS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {founder.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Survey Gallery Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            From the Ground – Insights from Our Village Survey
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {surveyPhotos.map((photo, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-center font-medium text-gray-700">
                    {photo.caption}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 italic font-medium">
              "Our journey began with listening – these images capture the real stories that shaped GOHUBS."
            </p>
          </div>
        </section>

        {/* Feedback Button Section */}
        <section className="text-center mt-16 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              We Value Your Opinion
            </h3>
            <p className="text-gray-600 mb-6">
              Help us improve GOHUBS by sharing your thoughts and suggestions.
            </p>
            <Button 
              onClick={() => setIsFeedbackOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="h-5 w-5" />
              Share Feedback
            </Button>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">GOHUBS</h3>
          <p className="text-blue-200 mb-4">Going With Health Hubs</p>
          <p className="text-sm text-blue-300">© 2024 GOHUBS. All rights reserved.</p>
        </div>
      </footer>

      {/* Feedback Form Modal */}
      <FeedbackForm 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </div>
  );
};

export default About;
