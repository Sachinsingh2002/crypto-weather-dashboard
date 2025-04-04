"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/redux/store"
import { fetchCryptoDetails, fetchCryptoHistory } from "@/redux/features/cryptoSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import CryptoPriceChart from "@/components/crypto/crypto-price-chart"
import CryptoDetailTable from "@/components/crypto/crypto-detail-table"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { toggleFavoriteCrypto } from "@/redux/features/favoritesSlice"

export default function CryptoDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { cryptos, cryptoDetails, cryptoHistory, loading } = useSelector((state: RootState) => state.crypto)
  const { favoriteCryptos } = useSelector((state: RootState) => state.favorites)

  const cryptoId = id as string
  const cryptoData = cryptos.find((crypto) => crypto.id.toLowerCase() === cryptoId.toLowerCase())
  const detailData = cryptoDetails[cryptoId]
  const historyData = cryptoHistory[cryptoId] || []
  const isFavorite = favoriteCryptos.includes(cryptoId)

  useEffect(() => {
    if (cryptoId) {
      dispatch(fetchCryptoDetails(cryptoId))
      dispatch(fetchCryptoHistory(cryptoId))
    }
  }, [dispatch, cryptoId])

  const handleToggleFavorite = () => {
    dispatch(toggleFavoriteCrypto(cryptoId))
  }

  if (loading && !cryptoData) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  if (!cryptoData) {
    return <div className="text-center py-10">Cryptocurrency not found</div>
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

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {cryptoData.name} ({cryptoData.symbol.toUpperCase()}) Details
        </h1>
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
          <CardTitle>Current Price</CardTitle>
          <CardDescription>Live price and key metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <span className="text-4xl font-bold">{formatPrice(cryptoData.price)}</span>
              <span className="text-muted-foreground">Current Price</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <span
                className={`text-4xl font-bold ${cryptoData.priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {formatPercentage(cryptoData.priceChange24h)}
              </span>
              <span className="text-muted-foreground">24h Change</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
              <span className="text-4xl font-bold">{formatMarketCap(cryptoData.marketCap)}</span>
              <span className="text-muted-foreground">Market Cap</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
          <CardDescription>Price trends over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-[300px] w-full" /> : <CryptoPriceChart data={historyData} />}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Metrics</CardTitle>
          <CardDescription>Additional cryptocurrency metrics and information</CardDescription>
        </CardHeader>
        <CardContent>
          {loading || !detailData ? <Skeleton className="h-[200px] w-full" /> : <CryptoDetailTable data={detailData} />}
        </CardContent>
      </Card>
    </div>
  )
}

