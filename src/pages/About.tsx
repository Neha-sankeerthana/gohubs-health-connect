

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
      role: "AI/ML Student & Healthcare Innovation Researcher",
      description: "Passionate about leveraging artificial intelligence to solve healthcare accessibility challenges in rural communities. Specializes in machine learning algorithms for predictive health analytics.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c2c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Kushbu Yadav Ommi",
      role: "AI/ML Student & Digital Health Solutions Developer",
      description: "Focused on developing user-friendly digital health platforms and telemedicine solutions. Experienced in creating accessible technology interfaces for diverse user bases.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Samatha Teddu",
      role: "AI/ML Student & Community Health Data Analyst",
      description: "Dedicated to analyzing community health patterns and developing data-driven solutions for rural healthcare delivery. Expert in health informatics and population health management.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Navya Rayala",
      role: "AI/ML Student & Healthcare Technology Integrator",
      description: "Specializes in integrating emerging technologies with traditional healthcare systems. Focused on creating seamless connections between patients, providers, and health resources.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80"
    },
    {
      name: "Kusuma Dadi",
      role: "AI/ML Student & Rural Health Advocacy Leader",
      description: "Committed to bridging the healthcare gap in underserved communities through innovative technology solutions. Leads community outreach and user experience research initiatives.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-3 text-center">
                    {founder.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-center mb-4">
                    {founder.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {founder.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Survey Section */}
        <section>
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            From the Ground – Insights from Our Village Survey
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
            {/* Large Survey Image */}
            <div className="w-full lg:w-2/3">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Village Survey - Community Interaction"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Survey Description */}
            <div className="w-full lg:w-1/3">
              <p className="text-lg text-gray-700 leading-relaxed">
                As part of our mission to improve rural healthcare, the GOHUBS team conducted a ground-level survey across remote villages in Visakhapatnam. We interacted with local communities to understand their health challenges, access gaps, and emergency needs. This real-time insight helped shape the services we now offer through GOHUBS.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 italic font-medium">
              "Our journey began with listening – these insights capture the real stories that shaped GOHUBS."
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

