"use client";

import { AD_TYPES } from '../constants/ad-types';
import AdTypeCard from '../components/AdTypeCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          광고 타입 선택
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
