package com.example.android_sdk.data.datasources

import com.example.android_sdk.domain.entities.Ad
import com.example.android_sdk.data.network.ApiService
import kotlinx.coroutines.delay

class AdDataSource(private val apiService: ApiService) {
    suspend fun getAds(): List<Ad> {
        // Simulate network delay
        delay(100)
        return apiService.getAds()
    }

    suspend fun getAdById(id: String): Ad? {
        return apiService.getAdById(id)
    }

    suspend fun createAd(ad: Ad): Ad {
        return apiService.createAd(ad)
    }

    suspend fun updateAd(id: String, ad: Ad): Ad {
        return apiService.updateAd(id, ad)
    }

    suspend fun deleteAd(id: String) {
        apiService.deleteAd(id)
    }
}
