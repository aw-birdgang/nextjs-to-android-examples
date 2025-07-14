// src/app/ads/[id]/page.tsx
import { notFound } from 'next/navigation';
import AdDetailClient from './AdDetailClient';
import { AdDataSource } from '../../../data/datasources/AdDataSource';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dataSource = new AdDataSource();
  const ad = await dataSource.getAdById(id);

  if (!ad) {
    notFound();
  }

  return <AdDetailClient ad={ad} />;
}