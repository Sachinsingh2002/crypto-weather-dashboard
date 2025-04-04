"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { toggleFavoriteCrypto } from "@/redux/features/favoritesSlice"
import type { Crypto } from "@/types/crypto"

interface CryptoCardProps {
  crypto: Crypto
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { favoriteCryptos } = useSelector((state: RootState) => state.favorites)
  const isFavorite = favoriteCryptos.includes(crypto.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavoriteCrypto(crypto.id))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      compactDisplay: "short",
    }).format(marketCap)
  }

  return (
    <Link href={`/crypto/${crypto.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{crypto.name}</h3>
              <p className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
              <p className="text-2xl font-bold mt-2">{formatPrice(crypto.price)}</p>
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
              <span className="text-sm text-muted-foreground">24h Change</span>
              <span className={`font-medium ${crypto.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {crypto.priceChange24h >= 0 ? "+" : ""}
                {crypto.priceChange24h.toFixed(2)}%
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Market Cap</span>
              <span className="font-medium">{formatMarketCap(crypto.marketCap)}</span>
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

