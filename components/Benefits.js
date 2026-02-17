import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, FolderIcon, ChartBarIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';

const benefits = [
  {
    icon: CameraIcon,
    title: "Instant AI-powered scanning",
    description: "Capture your entire collection with a single photo using advanced AI technology.",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: FolderIcon,
    title: "Smart digital organization",
    description: "Keep all your books organized digitally with smart categorization and search.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: ChartBarIcon,
    title: "Reading progress tracking",
    description: "Monitor your reading habits and progress across all your books seamlessly.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: StarIcon,
    title: "Personalized recommendations",
    description: "Get tailored suggestions based on your reading history and preferences.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: HeartIcon,
    title: "Pure reading enjoyment",
    description: "Focus on what matters most — discovering and enjoying great books.",
    color: "bg-pink-50 text-pink-600",
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
    <div ref={ref}>
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Why Choose Book Shelfie?
        </h2>
        <p className="text-gray-500">
          Features designed to enhance every aspect of your reading journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <div
              key={index}
              className={`card group p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${benefit.color}`}>
                <IconComponent className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
