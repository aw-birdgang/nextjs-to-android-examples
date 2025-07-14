import { Ad } from '../entities/Ad';
import { IAdRepository } from '../repositories/IAdRepository';

export class GetAdsUseCase {
  constructor(private adRepository: IAdRepository) {}

  async execute(type?: string): Promise<Ad[]> {
    try {
      if (type) {
        return await this.adRepository.getAdsByType(type);
      }
      return await this.adRepository.getAds();
    } catch (error) {
      console.error('Failed to get ads:', error);
      throw new Error('광고 목록을 불러오는데 실패했습니다.');
    }
  }
}