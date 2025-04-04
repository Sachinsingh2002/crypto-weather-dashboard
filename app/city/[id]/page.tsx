"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { fetchCityWeatherHistory } from "@/redux/features/weatherSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WeatherHistoryChart from "@/components/weather/weather-history-chart"
import WeatherDetailTable from "@/components/weather/weather-detail-table"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { toggleFavoriteCity } from "@/redux/features/favoritesSlice"

export default function CityDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { cities, cityHistory, loading } = useSelector((state: RootState) => state.weather)
  const { favoriteCities } = useSelector((state: RootState) => state.favorites)

  const cityName = decodeURIComponent(id as string)
  const cityData = cities.find((city) => city.name.toLowerCase() === cityName.toLowerCase())
  const historyData = cityHistory[cityName] || []
  const isFavorite = favoriteCities.includes(cityName)

  useEffect(() => {
    if (cityName) {
      dispatch(fetchCityWeatherHistory(cityName))
    }
  }, [dispatch, cityName])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCity(cityName))
  }

  if (loading && !cityData) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  if (!cityData) {
    return <div className="text-center py-10">City not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{cityName} Weather Details</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Weather</CardTitle>
          <CardDescription>Current weather conditions in {cityName}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <span className="text-4xl font-bold">{cityData.temp}°C</span>
              <span className="text-muted-foreground">Temperature</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <span className="text-4xl font-bold">{cityData.humidity}%</span>
              <span className="text-muted-foreground">Humidity</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <span className="text-4xl font-bold capitalize">{cityData.condition}</span>
              <span className="text-muted-foreground">Condition</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weather History</CardTitle>
          <CardDescription>Temperature trends over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-[300px] w-full" /> : <WeatherHistoryChart data={historyData} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Weather Data</CardTitle>
          <CardDescription>Hourly forecast and additional metrics</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-[200px] w-full" /> : <WeatherDetailTable data={historyData} />}
        </CardContent>
      </Card>
    </div>
  )
}

