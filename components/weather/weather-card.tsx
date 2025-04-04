"use client"

import type React from "react"


import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { toggleFavoriteCity } from "@/redux/features/favoritesSlice"
import type { City } from "@/types/weather"

interface WeatherCardProps {
  city: City
}

export default function WeatherCard({ city }: WeatherCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { favoriteCities } = useSelector((state: RootState) => state.favorites)
  const isFavorite = favoriteCities.includes(city.name)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavoriteCity(city.name))
  }

  return (
    <Link href={`/city/${encodeURIComponent(city.name)}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{city.name}</h3>
              <p className="text-3xl font-bold mt-2">{city.temp}°C</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Humidity</span>
              <span className="font-medium">{city.humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Condition</span>
              <span className="font-medium capitalize">{city.condition}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button variant="ghost" className="w-full" size="sm">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

