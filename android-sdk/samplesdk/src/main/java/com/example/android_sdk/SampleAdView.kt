package com.example.android_sdk

import android.content.Context
import android.util.AttributeSet
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.widget.Toast
import android.util.Log

class SampleAdView @JvmOverloads constructor(
    context: Context, attrs: AttributeSet? = null
) : WebView(context, attrs) {
    
    interface AdViewListener {
        fun onAdLoaded()
        fun onAdError(error: String)
        fun onRewardClaimed(reward: String)
    }
    
    private var listener: AdViewListener? = null
    
    init {
        Log.d("SampleAdView", "WebView 초기화")
        setupWebView()
    }
    
    private fun setupWebView() {
        settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            setSupportZoom(true)
            builtInZoomControls = true
            displayZoomControls = false
        }
        
        webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d("SampleAdView", "onPageFinished: $url")
                listener?.onAdLoaded()
            }
            
            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                Log.e("SampleAdView", "onReceivedError: ${error?.description}")
                val errorMessage = "광고 로드 실패: ${error?.description}"
                listener?.onAdError(errorMessage)
                Toast.makeText(context, errorMessage, Toast.LENGTH_SHORT).show()
            }
        }
        
        // JavaScript 인터페이스 추가
        addJavascriptInterface(WebAppInterface(), "Android")
    }
    
    fun setAdViewListener(listener: AdViewListener) {
        this.listener = listener
    }
    
    fun loadAd(url: String) {
        Log.d("SampleAdView", "광고 URL 로드 시도: $url")
        loadUrl(url)
    }
    
    inner class WebAppInterface {
        @android.webkit.JavascriptInterface
        fun claimReward(reward: String) {
            listener?.onRewardClaimed(reward)
        }
    }
}
