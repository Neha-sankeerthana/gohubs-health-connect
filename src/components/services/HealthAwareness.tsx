
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HealthAwareness = () => {
  const [activeCategory, setActiveCategory] = useState('maternity');

  const videoCategories = {
    maternity: [
      { title: "Prenatal Care Essentials", videoId: "dQw4w9WgXcQ", description: "Complete guide to prenatal care" },
      { title: "Healthy Pregnancy Tips", videoId: "dQw4w9WgXcQ", description: "Tips for a healthy pregnancy journey" },
      { title: "Postpartum Care", videoId: "dQw4w9WgXcQ", description: "Essential postpartum care guidelines" }
    ],
    diet: [
      { title: "Balanced Diet Planning", videoId: "dQw4w9WgXcQ", description: "How to plan a balanced diet" },
      { title: "Nutrition for Different Ages", videoId: "dQw4w9WgXcQ", description: "Age-specific nutritional needs" },
      { title: "Healthy Cooking Methods", videoId: "dQw4w9WgXcQ", description: "Healthy ways to prepare food" }
    ],
    hygiene: [
      { title: "Personal Hygiene Basics", videoId: "dQw4w9WgXcQ", description: "Essential personal hygiene practices" },
      { title: "Hand Washing Techniques", videoId: "dQw4w9WgXcQ", description: "Proper hand washing methods" },
      { title: "Home Sanitation", videoId: "dQw4w9WgXcQ", description: "Keeping your home clean and safe" }
    ],
    exercise: [
      { title: "Daily Exercise Routines", videoId: "dQw4w9WgXcQ", description: "Simple daily exercises for everyone" },
      { title: "Yoga for Beginners", videoId: "dQw4w9WgXcQ", description: "Basic yoga poses and benefits" },
      { title: "Cardio Workouts at Home", videoId: "dQw4w9WgXcQ", description: "Effective home cardio exercises" }
    ],
    general: [
      { title: "Preventive Healthcare", videoId: "dQw4w9WgXcQ", description: "Preventing common health issues" },
      { title: "Mental Health Awareness", videoId: "dQw4w9WgXcQ", description: "Understanding mental health" },
      { title: "First Aid Basics", videoId: "dQw4w9WgXcQ", description: "Essential first aid knowledge" }
    ]
  };

  const categories = [
    { key: 'maternity', label: 'Maternity', icon: '🤱' },
    { key: 'diet', label: 'Diet Plans', icon: '🥗' },
    { key: 'hygiene', label: 'Hygiene', icon: '🧼' },
    { key: 'exercise', label: 'Exercise', icon: '💪' },
    { key: 'general', label: 'General Health', icon: '🏥' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Awareness</CardTitle>
        <CardDescription>Educational content for better health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category.key}
              variant={activeCategory === category.key ? "default" : "outline"}
              onClick={() => setActiveCategory(category.key)}
              className="flex items-center gap-2"
            >
              <span>{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videoCategories[activeCategory as keyof typeof videoCategories].map((video, index) => (
            <div key={index} className="border rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">{video.title}</h4>
                <p className="text-sm text-gray-600">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAwareness;
