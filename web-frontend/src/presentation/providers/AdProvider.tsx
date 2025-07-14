"use client";

import React, { createContext, useContext, ReactNode } from 'react';
import { useAds } from '../hooks/useAds';
import { useReward } from '../hooks/useReward';
import { Ad, Reward } from '../../domain/entities/Ad';

interface AdContextType {
  ads: Ad[];
  loading: boolean;
  error: string | null;
  claimReward: (adId: string) => Promise<Reward | null>;
  claiming: boolean;
  rewardError: string | null;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const useAdContext = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAdContext must be used within an AdProvider');
  }
  return context;
};

interface AdProviderProps {
  children: ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({ children }) => {
  const { ads, loading, error } = useAds();
  const { claimReward, claiming, error: rewardError } = useReward();

  const value: AdContextType = {
    ads,
    loading,
    error,
    claimReward,
    claiming,
    rewardError
  };

  return (
    <AdContext.Provider value={value}>
      {children}
    </AdContext.Provider>
  );
};
