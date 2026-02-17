import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, SparklesIcon, BookOpenIcon, StarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    icon: CameraIcon,
    title: 'Scan Your Bookshelf',
    description: 'Point your camera at your bookshelf and capture a photo',
  },
  {
    icon: SparklesIcon,
    title: 'AI Recognition',
    description: 'Our AI instantly identifies books using advanced computer vision',
  },
  {
    icon: BookOpenIcon,
    title: 'Organize & Track',
    description: 'Automatically organize your library and track reading progress',
  },
  {
    icon: StarIcon,
    title: 'Discover New Books',
    description: 'Get personalized recommendations powered by smart AI',
  },
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.dataset.step);
            setTimeout(() => {
              setVisibleSteps((prev) => [...prev, stepIndex]);
            }, stepIndex * 100);
          }
        });
      },
      { threshold: 0.5 }
    );

    const stepElements = containerRef.current?.querySelectorAll('.step');
    stepElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 font-inter">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            return (
              <React.Fragment key={index}>
                <div
                  data-step={index}
                  className={`step flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-inter">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-inter">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:flex items-center">
                    <ChevronRightIcon className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}