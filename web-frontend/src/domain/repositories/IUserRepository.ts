import { User } from '../entities/Ad';

export interface IUserRepository {
  getCurrentUser(): Promise<User | null>;
  updateUser(user: Partial<User>): Promise<User>;
  getUserRewards(userId: string): Promise<number>;
  hasCompletedAd(userId: string, adId: string): Promise<boolean>;
}
