package com.example.android_sdk.data.repositories

import com.example.android_sdk.domain.entities.Ad
import com.example.android_sdk.domain.repositories.AdRepository
import com.example.android_sdk.data.datasources.AdDataSource

class AdRepositoryImpl(private val dataSource: AdDataSource) : AdRepository {
    override suspend fun getAds(): List<Ad> {
        return dataSource.getAds()
    }

    override suspend fun getAdById(id: String): Ad? {
        return dataSource.getAdById(id)
    }

    override suspend fun getAdsByType(type: String): List<Ad> {
        val ads = dataSource.getAds()
        return ads.filter { it.type.name.lowercase() == type.lowercase() }
    }

    override suspend fun createAd(ad: Ad): Ad {
        return dataSource.createAd(ad)
    }

    override suspend fun updateAd(id: String, ad: Ad): Ad {
        return dataSource.updateAd(id, ad)
    }

    override suspend fun deleteAd(id: String) {
        dataSource.deleteAd(id)
    }
}
