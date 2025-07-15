"use client";

import { AD_TYPES } from '../constants/ad-types';
import AdTypeCard from '../components/AdTypeCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-12 text-center drop-shadow-sm">
          🎯 광고 타입 선택
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {AD_TYPES.map((type) => (
            <AdTypeCard
              key={type.key}
              name={type.name}
              image={type.image}
              route={type.route}
              description={type.description}
              example={type.example}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
