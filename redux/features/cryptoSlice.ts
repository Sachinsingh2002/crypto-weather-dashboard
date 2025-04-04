import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { Crypto, CryptoDetail, CryptoHistory } from "@/types/crypto"

interface CryptoState {
  cryptos: Crypto[]
  cryptoDetails: Record<string, CryptoDetail>
  cryptoHistory: Record<string, CryptoHistory[]>
  loading: boolean
  error: string | null
}

const initialState: CryptoState = {
  cryptos: [],
  cryptoDetails: {},
  cryptoHistory: {},
  loading: false,
  error: null,
}

// Mock API call to fetch crypto data
export const fetchCryptoData = createAsyncThunk("crypto/fetchCryptoData", async () => {
  try {
    // In a real app, this would be an API call to CoinGecko or similar
    // For this demo, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data for three cryptocurrencies
    return [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        price: 50000 + Math.random() * 2000,
        priceChange24h: 2.5,
        marketCap: 950000000000,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        price: 3000 + Math.random() * 200,
        priceChange24h: -1.2,
        marketCap: 350000000000,
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ada",
        price: 1.2 + Math.random() * 0.2,
        priceChange24h: 5.8,
        marketCap: 40000000000,
      },
    ]
  } catch (error) {
    throw new Error("Failed to fetch cryptocurrency data")
  }
})

// Mock API call to fetch crypto details
export const fetchCryptoDetails = createAsyncThunk("crypto/fetchCryptoDetails", async (cryptoId: string) => {
  try {
    // In a real app, this would be an API call to CoinGecko or similar
    // For this demo, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate mock details based on the crypto
    let detail: CryptoDetail = {
      id: cryptoId,
      marketCap: 0,
      volume24h: 0,
      circulatingSupply: 0,
      totalSupply: 0,
      maxSupply: 0,
      allTimeHigh: 0,
      allTimeHighDate: "",
      priceChange7d: 0,
      priceChange30d: 0,
      priceChange1y: 0,
    }

    if (cryptoId === "bitcoin") {
      detail = {
        id: "bitcoin",
        marketCap: 950000000000,
        volume24h: 25000000000,
        circulatingSupply: 19000000,
        totalSupply: 21000000,
        maxSupply: 21000000,
        allTimeHigh: 69000,
        allTimeHighDate: "2021-11-10T00:00:00.000Z",
        priceChange7d: 5.2,
        priceChange30d: 10.5,
        priceChange1y: 25.8,
      }
    } else if (cryptoId === "ethereum") {
      detail = {
        id: "ethereum",
        marketCap: 350000000000,
        volume24h: 15000000000,
        circulatingSupply: 120000000,
        totalSupply: 120000000,
        maxSupply: 0, // Ethereum has no max supply
        allTimeHigh: 4800,
        allTimeHighDate: "2021-11-08T00:00:00.000Z",
        priceChange7d: -2.1,
        priceChange30d: 8.3,
        priceChange1y: 15.2,
      }
    } else if (cryptoId === "cardano") {
      detail = {
        id: "cardano",
        marketCap: 40000000000,
        volume24h: 1500000000,
        circulatingSupply: 35000000000,
        totalSupply: 45000000000,
        maxSupply: 45000000000,
        allTimeHigh: 3.1,
        allTimeHighDate: "2021-09-02T00:00:00.000Z",
        priceChange7d: 8.5,
        priceChange30d: -5.2,
        priceChange1y: -10.5,
      }
    }

    return detail
  } catch (error) {
    throw new Error(`Failed to fetch details for ${cryptoId}`)
  }
})

// Mock API call to fetch crypto price history
export const fetchCryptoHistory = createAsyncThunk("crypto/fetchCryptoHistory", async (cryptoId: string) => {
  try {
    // In a real app, this would be an API call to CoinGecko or similar
    // For this demo, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate mock historical data for the past 7 days
    const today = new Date()
    const history: CryptoHistory[] = []

    // Set base price based on the crypto
    let basePrice = 0
    if (cryptoId === "bitcoin") {
      basePrice = 50000
    } else if (cryptoId === "ethereum") {
      basePrice = 3000
    } else if (cryptoId === "cardano") {
      basePrice = 1.2
    }

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Add some randomness to the price
      const volatility = cryptoId === "bitcoin" ? 2000 : cryptoId === "ethereum" ? 200 : 0.2
      const price = basePrice + (Math.random() - 0.5) * volatility

      history.push({
        date: date.toISOString(),
        price,
      })
    }

    return { cryptoId, history }
  } catch (error) {
    throw new Error(`Failed to fetch history for ${cryptoId}`)
  }
})

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange24h: number }>) => {
      const { id, price, priceChange24h } = action.payload
      const cryptoIndex = state.cryptos.findIndex((crypto) => crypto.id === id)

      if (cryptoIndex !== -1) {
        state.cryptos[cryptoIndex].price = price
        state.cryptos[cryptoIndex].priceChange24h = priceChange24h
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<Crypto[]>) => {
        state.loading = false
        state.cryptos = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch cryptocurrency data"
      })
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action: PayloadAction<CryptoDetail>) => {
        state.loading = false
        state.cryptoDetails[action.payload.id] = action.payload
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch cryptocurrency details"
      })
      .addCase(fetchCryptoHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCryptoHistory.fulfilled,
        (state, action: PayloadAction<{ cryptoId: string; history: CryptoHistory[] }>) => {
          state.loading = false
          state.cryptoHistory[action.payload.cryptoId] = action.payload.history
        },
      )
      .addCase(fetchCryptoHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch cryptocurrency history"
      })
  },
})

export const { updateCryptoPrice } = cryptoSlice.actions
export default cryptoSlice.reducer

