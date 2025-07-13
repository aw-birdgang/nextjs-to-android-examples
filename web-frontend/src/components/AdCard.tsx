import React from "react";
import { Ad } from "../types/ad";

interface AdCardProps {
  ad: Ad;
  onClick?: () => void;
}

export default function AdCard({ ad, onClick }: AdCardProps) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: 8,
        padding: 16,
        borderRadius: 8,
        background: "#fff",
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <img src={ad.image} alt={ad.title} width={100} style={{ borderRadius: 8 }} />
      <h2>{ad.title}</h2>
      <p>{ad.description}</p>
      <div>
        <b>리워드:</b> {ad.reward}
      </div>
      <div>
        <b>유형:</b> {ad.type}
      </div>
    </div>
  );
}
