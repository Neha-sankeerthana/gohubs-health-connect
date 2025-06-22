
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HealthAwareness = () => {
  const [activeCategory, setActiveCategory] = useState('maternity');

  const videoCategories = {
    maternity: [
      { title: "Prenatal Care Essentials", videoId: "YQaYWWh9v3U", description: "Complete guide to prenatal care and pregnancy health" },
      { title: "Healthy Pregnancy Tips", videoId: "t6nOZdYTspY", description: "Essential tips for a healthy pregnancy journey" },
      { title: "Postpartum Care Guide", videoId: "sJ4fFjWyYJE", description: "Essential postpartum care and recovery guidelines" }
    ],
    diet: [
      { title: "Balanced Diet Planning", videoId: "2Jh3kCDbhBM", description: "How to plan a nutritious balanced diet for optimal health" },
      { title: "Healthy Eating Habits", videoId: "bi7GB5KLb_Y", description: "Building sustainable healthy eating habits for life" },
      { title: "Nutrition Basics Explained", videoId: "QPJmvZDbG-g", description: "Understanding essential nutrients and their benefits" }
    ],
    hygiene: [
      { title: "Hand Hygiene Importance", videoId: "3PmVJQUCm4E", description: "Proper hand washing techniques and importance" },
      { title: "Personal Hygiene Essentials", videoId: "nt7SLvQhOBo", description: "Daily personal hygiene practices for good health" },
      { title: "Home Sanitation Guide", videoId: "sjDuwc9KBps", description: "Keeping your home clean and germ-free" }
    ],
    exercise: [
      { title: "Daily Exercise Benefits", videoId: "2Vj_9CgEa5M", description: "Benefits of regular physical activity and exercise" },
      { title: "Home Workout Routines", videoId: "UBMk30rjy0o", description: "Simple exercises you can do at home daily" },
      { title: "Stretching for Flexibility", videoId: "L_xrDAtykMI", description: "Basic stretching exercises for better flexibility" }
    ],
    general: [
      { title: "Mental Health Awareness", videoId: "3QIfkeA6HBY", description: "Understanding and maintaining good mental health" },
      { title: "First Aid Basics", videoId: "bGqyHh9dTaU", description: "Essential first aid skills everyone should know" },
      { title: "Preventive Healthcare Tips", videoId: "l4EBQZGCl-w", description: "Simple steps to prevent common health problems" }
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
        <CardDescription>Educational content for better health and wellness</CardDescription>
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
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2 text-gray-800">{video.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthAwareness;
