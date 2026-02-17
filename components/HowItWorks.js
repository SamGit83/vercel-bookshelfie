import React, { useState, useEffect, useRef } from 'react';
import { CameraIcon, SparklesIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    icon: CameraIcon,
    title: 'Scan Your Bookshelf',
    description: 'Point your camera at your bookshelf and capture a photo.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: SparklesIcon,
    title: 'AI Recognition',
    description: 'Our AI instantly identifies books using advanced computer vision.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: BookOpenIcon,
    title: 'Organize & Track',
    description: 'Automatically organize your library and track reading progress.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: StarIcon,
    title: 'Discover New Books',
    description: 'Get personalized recommendations powered by smart AI.',
    color: 'bg-amber-50 text-amber-600',
  },
];

export default function HowItWorks() {
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

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          How It Works
        </h2>
        <p className="text-gray-500">Get started in four simple steps.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={index}
              className={`card group p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-gray-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 group-hover:text-brand-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
