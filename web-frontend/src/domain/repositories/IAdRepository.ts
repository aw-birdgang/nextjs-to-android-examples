import { Ad } from '../entities/Ad';

export interface IAdRepository {
  getAds(): Promise<Ad[]>;
  getAdById(id: string): Promise<Ad | null>;
  getAdsByType(type: string): Promise<Ad[]>;
  createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ad>;
  updateAd(id: string, ad: Partial<Ad>): Promise<Ad>;
  deleteAd(id: string): Promise<void>;
}
