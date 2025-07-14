package com.example.android_sdk.data.network

import com.example.android_sdk.domain.entities.Ad
import retrofit2.http.*

interface ApiService {
    @GET("ads")
    suspend fun getAds(): List<Ad>

    @GET("ads/{id}")
    suspend fun getAdById(@Path("id") id: String): Ad?

    @POST("ads")
    suspend fun createAd(@Body ad: Ad): Ad

    @PUT("ads/{id}")
    suspend fun updateAd(@Path("id") id: String, @Body ad: Ad): Ad

    @DELETE("ads/{id}")
    suspend fun deleteAd(@Path("id") id: String)
}
