export interface Crypto {
  id: string
  name: string
  symbol: string
  price: number
  priceChange24h: number
  marketCap: number
}

export interface CryptoDetail {
  id: string
  marketCap: number
  volume24h: number
  circulatingSupply: number
  totalSupply: number
  maxSupply: number
  allTimeHigh: number
  allTimeHighDate: string
  priceChange7d: number
  priceChange30d: number
  priceChange1y: number
}

export interface CryptoHistory {
  date: string
  price: number
}

