package com.example.sample_app

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.android_sdk.SampleAdSdk
import com.example.android_sdk.SampleAdView
import android.util.Log
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity(), SampleAdView.AdViewListener {
    
    private lateinit var adView: SampleAdView
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d("MainActivity", "onCreate 호출됨")
        
        // SDK 초기화
        SampleAdSdk.initialize(this)
        
        // 광고 뷰 설정
        adView = SampleAdView(this).apply {
            setAdViewListener(this@MainActivity)
        }
        
        setContentView(adView)
        
        // 광고 로드
        loadAd()
    }
    
    private fun loadAd() {
        val url = "http://10.0.2.2:3000/ads/ua"
        Log.d("MainActivity", "광고 URL 로드 시도: $url")
        try {
            adView.loadAd(url)
        } catch (e: Exception) {
            Log.e("MainActivity", "광고 로드 실패: ${e.message}")
            Toast.makeText(this, "광고 로드 실패: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }
    
    override fun onAdLoaded() {
        Log.d("MainActivity", "광고 로드 성공")
        Toast.makeText(this, "광고가 성공적으로 로드되었습니다!", Toast.LENGTH_SHORT).show()
    }
    
    override fun onAdError(error: String) {
        Log.e("MainActivity", "광고 로드 실패: $error")
        Toast.makeText(this, error, Toast.LENGTH_LONG).show()
    }
    
    override fun onRewardClaimed(reward: String) {
        Toast.makeText(this, "리워드 지급: $reward", Toast.LENGTH_LONG).show()
    }
    
    override fun onBackPressed() {
        if (adView.canGoBack()) {
            adView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}