import Image from 'next/image';

interface Ad {
  id: string;
  title: string;
  description: string;
  reward: string;
  image: string;
}

interface AdDetailProps {
  ad: Ad;
  onBack: () => void;
  onRewardClaim: () => void;
}

export default function AdDetail({ ad, onBack, onRewardClaim }: AdDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white shadow-md mr-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">광고 상세</h1>
        </div>

        {/* 광고 이미지 */}
        <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/default-ad.jpg';
            }}
          />
        </div>

        {/* 광고 정보 */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {ad.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {ad.description}
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-green-800 font-medium">리워드</span>
              <span className="text-2xl font-bold text-green-600">
                {ad.reward}
              </span>
            </div>
          </div>

          {/* 참여 버튼 */}
          <button
            onClick={onRewardClaim}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
          >
            리워드 받기
          </button>
        </div>
      </div>
    </div>
  );
}
