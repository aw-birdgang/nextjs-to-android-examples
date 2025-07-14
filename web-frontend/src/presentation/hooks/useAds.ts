"use client";

import { useState, useEffect } from 'react';
import { Ad } from '../../domain/entities/Ad';
import { GetAdsUseCase } from '../../domain/usecases/GetAdsUseCase';
import { AdRepositoryImpl } from '../../data/repositories/AdRepositoryImpl';
import { AdDataSource } from '../../data/datasources/AdDataSource';

export const useAds = (type?: string) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        setError(null);
        const adRepository = new AdRepositoryImpl(new AdDataSource());
        const getAdsUseCase = new GetAdsUseCase(adRepository);
        const result = await getAdsUseCase.execute(type);
        setAds(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [type]);

  return { ads, loading, error };
};