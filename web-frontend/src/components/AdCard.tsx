import { Ad } from "../domain/entities/Ad";
import Link from "next/link";
import Image from "next/image";

interface AdCardProps {
  ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ads/${ad.id}`}>
      <div className="border-2 border-gray-200 m-3 p-6 rounded-2xl bg-white cursor-pointer w-80 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-blue-300">
        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 border-2 border-gray-100">
          <Image
            src={ad.image}
            alt={ad.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-3 leading-tight">{ad.title}</h2>
        <p className="text-gray-700 text-sm mb-4 font-medium leading-relaxed">{ad.description}</p>
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-4 mb-3 shadow-lg">
          <span className="font-black text-lg">💰 리워드: {ad.reward}</span>
        </div>
        <div className="text-sm text-gray-600 font-semibold bg-gray-50 rounded-lg px-3 py-2">
          <span className="font-bold">📋 유형:</span> {ad.type}
        </div>
        {!ad.isActive && (
          <div className="text-sm text-white font-black mt-3 bg-red-500 border-2 border-red-600 rounded-xl px-4 py-2 text-center">
            ⚠️ 비활성화됨
          </div>
        )}
      </div>
    </Link>
  );
}
