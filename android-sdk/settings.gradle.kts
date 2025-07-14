pluginManagement {
    repositories {
        gradlePluginPortal()
        google()         // ← 반드시 필요!
        mavenCentral()
    }
}
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "android-sdk"
include(":samplesdk", ":sample-app")
