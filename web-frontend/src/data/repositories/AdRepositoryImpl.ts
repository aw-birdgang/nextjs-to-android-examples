import { Ad } from '../../domain/entities/Ad';
import { IAdRepository } from '../../domain/repositories/IAdRepository';
import { AdDataSource } from '../datasources/AdDataSource';

export class AdRepositoryImpl implements IAdRepository {
  constructor(private dataSource: AdDataSource) {}

  async getAds(): Promise<Ad[]> {
    return await this.dataSource.getAds();
  }

  async getAdById(id: string): Promise<Ad | null> {
    return await this.dataSource.getAdById(id);
  }

  async getAdsByType(type: string): Promise<Ad[]> {
    const ads = await this.dataSource.getAds();
    return ads.filter(ad => ad.type === type);
  }

  async createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ad> {
    return await this.dataSource.createAd(ad);
  }

  async updateAd(id: string, ad: Partial<Ad>): Promise<Ad> {
    return await this.dataSource.updateAd(id, ad);
  }

  async deleteAd(id: string): Promise<void> {
    await this.dataSource.deleteAd(id);
  }
}