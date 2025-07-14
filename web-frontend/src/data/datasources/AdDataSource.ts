import { Ad } from '../../domain/entities/Ad';
import { ads } from '../local/ads';

export class AdDataSource {
  async getAds(): Promise<Ad[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return ads.map(ad => ({
      ...ad,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  async getAdById(id: string): Promise<Ad | null> {
    const ads = await this.getAds();
    return ads.find(ad => ad.id === id) || null;
  }

  async createAd(ad: Omit<Ad, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ad> {
    const newAd: Ad = {
      ...ad,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return newAd;
  }

  async updateAd(id: string, ad: Partial<Ad>): Promise<Ad> {
    const existingAd = await this.getAdById(id);
    if (!existingAd) {
      throw new Error('Ad not found');
    }
    return { ...existingAd, ...ad, updatedAt: new Date() };
  }

  async deleteAd(id: string): Promise<void> { // id 파라미터 추가
    console.log(`Deleting ad with id: ${id}`);
  }
}
