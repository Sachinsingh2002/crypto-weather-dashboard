import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
  favoriteCities: string[]
  favoriteCryptos: string[]
}

// Load favorites from localStorage if available
const loadFavoritesFromStorage = (): FavoritesState => {
  if (typeof window === "undefined") {
    return {
      favoriteCities: [],
      favoriteCryptos: [],
    }
  }

  try {
    const storedCities = localStorage.getItem("favoriteCities")
    const storedCryptos = localStorage.getItem("favoriteCryptos")

    return {
      favoriteCities: storedCities ? JSON.parse(storedCities) : [],
      favoriteCryptos: storedCryptos ? JSON.parse(storedCryptos) : [],
    }
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error)
    return {
      favoriteCities: [],
      favoriteCryptos: [],
    }
  }
}

const initialState: FavoritesState = loadFavoritesFromStorage()

// Helper function to save favorites to localStorage
const saveFavoritesToStorage = (state: FavoritesState) => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("favoriteCities", JSON.stringify(state.favoriteCities))
    localStorage.setItem("favoriteCryptos", JSON.stringify(state.favoriteCryptos))
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error)
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const cityName = action.payload
      const index = state.favoriteCities.indexOf(cityName)

      if (index === -1) {
        state.favoriteCities.push(cityName)
      } else {
        state.favoriteCities.splice(index, 1)
      }

      saveFavoritesToStorage(state)
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const cryptoId = action.payload
      const index = state.favoriteCryptos.indexOf(cryptoId)

      if (index === -1) {
        state.favoriteCryptos.push(cryptoId)
      } else {
        state.favoriteCryptos.splice(index, 1)
      }

      saveFavoritesToStorage(state)
    },
  },
})

export const { toggleFavoriteCity, toggleFavoriteCrypto } = favoritesSlice.actions
export default favoritesSlice.reducer

