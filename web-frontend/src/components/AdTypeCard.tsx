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
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center cursor-pointer h-full">
        <img
          src={image}
          alt={name}
          className="w-28 h-28 object-contain mb-4"
          style={{ background: '#f3f3f3', borderRadius: 12 }}
        />
        <div className="text-lg font-semibold text-gray-800 text-center">{name}</div>
        <div className="text-sm text-gray-500 text-center mt-1">{description}</div>
        <div className="text-xs text-gray-400 text-center mt-1">{example}</div>
      </div>
    </Link>
  );
}
