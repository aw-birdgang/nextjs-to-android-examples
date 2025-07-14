package com.example.android_sdk.domain.entities

data class Ad(
    val id: String,
    val type: AdType,
    val title: String,
    val description: String,
    val reward: String,
    val image: String,
    val example: String,
    val requirements: List<String>? = null,
    val duration: Int? = null,
    val maxRewards: Int? = null,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

enum class AdType {
    EXPOSE, SNS, UA, APP_INFLOW, ACTION, LIVE, RETARGETING, RANKING
}

data class User(
    val id: String,
    val email: String,
    val name: String,
    val totalRewards: Int,
    val completedAds: List<String>,
    val createdAt: Long = System.currentTimeMillis()
)

data class Reward(
    val id: String,
    val adId: String,
    val userId: String,
    val amount: Int,
    val status: RewardStatus,
    val claimedAt: Long? = null,
    val createdAt: Long = System.currentTimeMillis()
)

enum class RewardStatus {
    PENDING, COMPLETED, FAILED
}
