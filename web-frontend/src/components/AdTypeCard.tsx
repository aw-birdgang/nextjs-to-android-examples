// 광고 타입 진입 카드 (추가)
import Link from 'next/link';

type Props = {
  name: string;
  image: string;
  route: string;
  description: string;
  example: string;
};

export default function AdTypeCard({ name, image, route, description, example }: Props) {
  return (
    <Link href={route}>
      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer h-full border-2 border-gray-100 hover:border-blue-200 hover:scale-105">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border-2 border-blue-100">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="text-xl font-black text-gray-900 text-center mb-3 leading-tight">{name}</div>
        <div className="text-sm font-semibold text-gray-700 text-center mb-3 leading-relaxed">{description}</div>
        <div className="text-xs text-gray-600 text-center leading-relaxed bg-gray-50 rounded-lg p-3 w-full">{example}</div>
      </div>
    </Link>
  );
}
