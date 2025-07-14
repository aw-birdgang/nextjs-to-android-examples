package com.example.android_sdk.domain.repositories

import com.example.android_sdk.domain.entities.Ad

interface AdRepository {
    suspend fun getAds(): List<Ad>
    suspend fun getAdById(id: String): Ad?
    suspend fun getAdsByType(type: String): List<Ad>
    suspend fun createAd(ad: Ad): Ad
    suspend fun updateAd(id: String, ad: Ad): Ad
    suspend fun deleteAd(id: String)
}
