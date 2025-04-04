import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { News } from "@/types/news"

interface NewsState {
  news: News[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
}

// Mock API call to fetch news data
export const fetchNewsData = createAsyncThunk("news/fetchNewsData", async () => {
  try {
    // In a real app, this would be an API call to NewsData.io or similar
    // For this demo, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data for five news articles
    return [
      {
        id: "1",
        title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
        description:
          "Bitcoin has surged past $50,000 as more institutional investors add the cryptocurrency to their portfolios.",
        url: "https://example.com/news/1",
        source: "Crypto News",
        publishedAt: "2023-06-15T10:30:00Z",
        imageUrl: "/placeholder.svg?height=80&width=120",
      },
      {
        id: "2",
        title: "Ethereum 2.0 Upgrade: What You Need to Know",
        description:
          "The long-awaited Ethereum 2.0 upgrade is set to launch next month, promising improved scalability and reduced energy consumption.",
        url: "https://example.com/news/2",
        source: "Blockchain Insider",
        publishedAt: "2023-06-14T14:45:00Z",
        imageUrl: "/placeholder.svg?height=80&width=120",
      },
      {
        id: "3",
        title: "Regulatory Challenges Facing Cryptocurrency Markets",
        description:
          "Governments worldwide are developing new regulatory frameworks for cryptocurrencies, creating both challenges and opportunities.",
        url: "https://example.com/news/3",
        source: "Financial Times",
        publishedAt: "2023-06-13T09:15:00Z",
        imageUrl: "/placeholder.svg?height=80&width=120",
      },
      {
        id: "4",
        title: "NFT Market Shows Signs of Recovery After Slump",
        description:
          "The NFT market is showing signs of recovery after a prolonged slump, with trading volumes increasing by 30% in the past month.",
        url: "https://example.com/news/4",
        source: "Digital Art Daily",
        publishedAt: "2023-06-12T16:20:00Z",
        imageUrl: "/placeholder.svg?height=80&width=120",
      },
      {
        id: "5",
        title: "DeFi Protocols Reach $50 Billion in Total Value Locked",
        description:
          "Decentralized finance protocols have collectively reached $50 billion in total value locked, marking a significant milestone for the sector.",
        url: "https://example.com/news/5",
        source: "DeFi Pulse",
        publishedAt: "2023-06-11T11:10:00Z",
        imageUrl: "/placeholder.svg?height=80&width=120",
      },
    ]
  } catch (error) {
    throw new Error("Failed to fetch news data")
  }
})

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.loading = false
        state.news = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch news data"
      })
  },
})

export default newsSlice.reducer

