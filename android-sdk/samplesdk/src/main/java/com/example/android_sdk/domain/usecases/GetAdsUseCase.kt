package com.example.android_sdk.domain.usecases

import com.example.android_sdk.domain.entities.Ad
import com.example.android_sdk.domain.repositories.AdRepository

class GetAdsUseCase(private val adRepository: AdRepository) {
    suspend fun execute(type: String? = null): List<Ad> {
        return try {
            if (type != null) {
                adRepository.getAdsByType(type)
            } else {
                adRepository.getAds()
            }
        } catch (e: Exception) {
            throw Exception("Failed to get ads: ${e.message}")
        }
    }
}
