export class Analytics {
  static trackEvent(eventName: string, properties?: Record<string, string | number | boolean | undefined>) {
    // In a real app, this would send to analytics service
    console.log('Analytics Event:', eventName, properties);
  }

  static trackAdView(adId: string, adType: string) {
    this.trackEvent('ad_view', { adId, adType });
  }

  static trackAdClick(adId: string, adType: string) {
    this.trackEvent('ad_click', { adId, adType });
  }

  static trackRewardClaim(adId: string, rewardAmount: string) {
    this.trackEvent('reward_claim', { adId, rewardAmount });
  }

  static trackError(error: string, context?: string) {
    this.trackEvent('error', { error, context });
  }
}
