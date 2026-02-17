import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, FolderIcon, ChartBarIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: CameraIcon,
    title: "Instant AI-powered bookshelf scanning",
    description: "Capture your entire collection with a single photo using advanced AI technology."
  },
  {
    icon: FolderIcon,
    title: "Digital organization of entire collection",
    description: "Keep all your books organized digitally with smart categorization and search."
  },
  {
    icon: ChartBarIcon,
    title: "Effortless reading progress tracking",
    description: "Monitor your reading habits and progress across all your books seamlessly."
  },
  {
    icon: StarIcon,
    title: "Personalized book recommendations",
    description: "Get tailored suggestions based on your reading history and preferences."
  },
  {
    icon: HeartIcon,
    title: "Pure reading enjoyment and discovery",
    description: "Focus on what matters most - discovering and enjoying great books."
  }
];

export default function Benefits() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Book Shelfie?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of book management with features designed to enhance your reading journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className={`card group p-8 hover:scale-105 hover:shadow-elevated transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-100 transition-colors">
                  <IconComponent className="w-8 h-8 text-brand-600" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}