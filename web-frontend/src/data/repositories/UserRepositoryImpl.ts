import { User } from '../../domain/entities/Ad';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { LocalStorage } from '../../infrastructure/storage/LocalStorage';

export class UserRepositoryImpl implements IUserRepository {
  private readonly USER_KEY = 'current_user';
  private readonly COMPLETED_ADS_KEY = 'completed_ads';

  async getCurrentUser(): Promise<User | null> {
    const userData = LocalStorage.get<User>(this.USER_KEY);
    if (userData) {
      return userData;
    }

    // Mock user for development
    const mockUser: User = {
      id: 'user-1',
      email: 'user@example.com',
      name: '테스트 사용자',
      totalRewards: 0,
      completedAds: [],
      createdAt: new Date()
    };

    LocalStorage.set(this.USER_KEY, mockUser);
    return mockUser;
  }

  async updateUser(user: Partial<User>): Promise<User> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      throw new Error('사용자 정보를 찾을 수 없습니다.');
    }

    const updatedUser: User = { ...currentUser, ...user };
    LocalStorage.set(this.USER_KEY, updatedUser);
    return updatedUser;
  }

  async getUserRewards(): Promise<number> {
    const user = await this.getCurrentUser();
    return user?.totalRewards || 0;
  }

  async hasCompletedAd(userId: string, adId: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.completedAds.includes(adId) || false;
  }
}
