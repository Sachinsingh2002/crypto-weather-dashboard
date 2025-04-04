import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { City, WeatherHistory } from "@/types/weather"

interface WeatherState {
  cities: City[]
  cityHistory: Record<string, WeatherHistory[]>
  loading: boolean
  error: string | null
}

const initialState: WeatherState = {
  cities: [],
  cityHistory: {},
  loading: false,
  error: null,
}

// Mock API call to fetch weather data
export const fetchWeatherData = createAsyncThunk("weather/fetchWeatherData", async () => {
  try {
    // In a real app, this would be an API call to OpenWeatherMap
    // For this demo, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock data for three cities
    return [
      {
        name: "New York",
        temp: 22,
        humidity: 65,
        condition: "partly cloudy",
        windSpeed: 12,
      },
      {
        name: "London",
        temp: 18,
        humidity: 75,
        condition: "rainy",
        windSpeed: 15,
      },
      {
        name: "Tokyo",
        temp: 28,
        humidity: 60,
        condition: "sunny",
        windSpeed: 8,
      },
    ]
  } catch (error) {
    throw new Error("Failed to fetch weather data")
  }
})

// Mock API call to fetch weather history for a city
export const fetchCityWeatherHistory = createAsyncThunk("weather/fetchCityWeatherHistory", async (cityName: string) => {
  try {
    // In a real app, this would be an API call to OpenWeatherMap
    // For this demo, we'll simulate a delay and return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate mock historical data for the past 7 days
    const today = new Date()
    const history: WeatherHistory[] = []

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Generate random data based on the city
      let baseTemp = 0
      let baseHumidity = 0
      let conditions = ["sunny", "partly cloudy", "cloudy", "rainy"]

      if (cityName === "New York") {
        baseTemp = 20
        baseHumidity = 65
      } else if (cityName === "London") {
        baseTemp = 16
        baseHumidity = 75
        conditions = ["cloudy", "rainy", "partly cloudy", "foggy"]
      } else if (cityName === "Tokyo") {
        baseTemp = 26
        baseHumidity = 60
      }

      // Add some randomness
      const temp = baseTemp + Math.floor(Math.random() * 6) - 2
      const humidity = baseHumidity + Math.floor(Math.random() * 10) - 5
      const condition = conditions[Math.floor(Math.random() * conditions.length)]
      const windSpeed = 5 + Math.floor(Math.random() * 10)

      history.push({
        date: date.toISOString(),
        temp,
        humidity,
        condition,
        windSpeed,
      })
    }

    return { cityName, history }
  } catch (error) {
    throw new Error(`Failed to fetch weather history for ${cityName}`)
  }
})

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchWeatherData.fulfilled, (state, action: PayloadAction<City[]>) => {
        state.loading = false
        state.cities = action.payload
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch weather data"
      })
      .addCase(fetchCityWeatherHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchCityWeatherHistory.fulfilled,
        (state, action: PayloadAction<{ cityName: string; history: WeatherHistory[] }>) => {
          state.loading = false
          state.cityHistory[action.payload.cityName] = action.payload.history
        },
      )
      .addCase(fetchCityWeatherHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch city weather history"
      })
  },
})

export default weatherSlice.reducer

