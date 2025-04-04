"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import WeatherCard from "@/components/weather/weather-card"
import CryptoCard from "@/components/crypto/crypto-card"

export default function FavoritesSection() {
  const { cities } = useSelector((state: RootState) => state.weather)
  const { cryptos } = useSelector((state: RootState) => state.crypto)
  const { favoriteCities, favoriteCryptos } = useSelector((state: RootState) => state.favorites)

  const favoriteCityData = cities.filter((city) => favoriteCities.includes(city.name))

  const favoriteCryptoData = cryptos.filter((crypto) => favoriteCryptos.includes(crypto.id))

  const hasFavoriteCities = favoriteCityData.length > 0
  const hasFavoriteCryptos = favoriteCryptoData.length > 0

  if (!hasFavoriteCities && !hasFavoriteCryptos) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorites</CardTitle>
          <CardDescription>Your favorite cities and cryptocurrencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-muted-foreground">
            You haven&apos;t added any favorites yet. Star items to add them here.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {hasFavoriteCities && (
        <Card>
          <CardHeader>
            <CardTitle>Favorite Cities</CardTitle>
            <CardDescription>Weather for your favorite cities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteCityData.map((city) => (
                <WeatherCard key={city.name} city={city} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {hasFavoriteCryptos && (
        <Card>
          <CardHeader>
            <CardTitle>Favorite Cryptocurrencies</CardTitle>
            <CardDescription>Live data for your favorite cryptocurrencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {favoriteCryptoData.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

