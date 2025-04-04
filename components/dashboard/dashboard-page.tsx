"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { fetchWeatherData } from "@/redux/features/weatherSlice"
import { fetchCryptoData } from "@/redux/features/cryptoSlice"
import { fetchNewsData } from "@/redux/features/newsSlice"
import { initializeWebSocket } from "@/redux/features/websocketSlice"
import WeatherSection from "@/components/dashboard/weather-section"
import CryptoSection from "@/components/dashboard/crypto-section"
import NewsSection from "@/components/dashboard/news-section"
import FavoritesSection from "@/components/dashboard/favorites-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { favoriteCities, favoriteCryptos } = useSelector((state: RootState) => state.favorites)
  const hasFavorites = favoriteCities.length > 0 || favoriteCryptos.length > 0

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchWeatherData())
    dispatch(fetchCryptoData())
    dispatch(fetchNewsData())

    // Initialize WebSocket connection
    dispatch(initializeWebSocket())

    // Set up periodic data refresh (every 60 seconds)
    const intervalId = setInterval(() => {
      dispatch(fetchWeatherData())
      dispatch(fetchCryptoData())
      dispatch(fetchNewsData())
    }, 60000)

    return () => clearInterval(intervalId)
  }, [dispatch])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Tabs defaultValue={hasFavorites ? "favorites" : "all"}>
        <TabsList>
          {hasFavorites && <TabsTrigger value="favorites">Favorites</TabsTrigger>}
          <TabsTrigger value="all">All Data</TabsTrigger>
        </TabsList>

        {hasFavorites && (
          <TabsContent value="favorites" className="space-y-6">
            <FavoritesSection />
          </TabsContent>
        )}

        <TabsContent value="all" className="space-y-6">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

