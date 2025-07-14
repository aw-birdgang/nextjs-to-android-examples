import { Ad } from "../domain/entities/Ad";
import Link from "next/link";
import Image from "next/image";

interface AdCardProps {
  ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ads/${ad.id}`}>
      <div style={{
        border: "1px solid #ccc",
        margin: 8,
        padding: 16,
        borderRadius: 8,
        background: "#fff",
        cursor: "pointer",
        width: 300,
      }}>
        <Image
          src={ad.image}
          alt={ad.title}
          width={280}
          height={140}
          style={{ borderRadius: 8, objectFit: "cover" }}
          unoptimized // 개발 중 외부 이미지나 로컬 이미지 캐싱 문제 방지
        />
        <h2 style={{ margin: "8px 0 4px 0" }}>{ad.title}</h2>
        <p style={{ color: "#666", fontSize: 14 }}>{ad.description}</p>
        <div style={{ marginTop: 8 }}>
          <b>리워드:</b> {ad.reward}
        </div>
        <div style={{ fontSize: 12, color: "#888" }}>
          <b>유형:</b> {ad.type}
        </div>
        {!ad.isActive && (
          <div style={{ 
            fontSize: 12, 
            color: "#ff4444", 
            fontWeight: "bold",
            marginTop: 4 
          }}>
            비활성화됨
          </div>
        )}
      </div>
    </Link>
  );
}
