import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AppDispatch } from "../store"
import { updateCryptoPrice } from "./cryptoSlice"
import { addNotification } from "./notificationsSlice"

interface WebSocketState {
  connected: boolean
  socket: WebSocket | null
  error: string | null
}

const initialState: WebSocketState = {
  connected: false,
  socket: null,
  error: null,
}

// Fix the MockWebSocket implementation to properly handle WebSocket events
class MockWebSocket {
  url: string
  onopen: ((this: WebSocket, ev: Event) => any) | null = null
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null = null
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null = null
  onerror: ((this: WebSocket, ev: Event) => any) | null = null
  readyState = 0
  CONNECTING = 0
  OPEN = 1
  CLOSING = 2
  CLOSED = 3

  constructor(url: string) {
    this.url = url

    // Simulate connection after a short delay
    setTimeout(() => {
      this.readyState = 1
      if (this.onopen) this.onopen.call(this as unknown as WebSocket, new Event("open"))

      // Start sending mock price updates
      this.startMockUpdates()
    }, 1000)
  }

  send(data: string): void {
    console.log("Mock WebSocket sending:", data)
  }

  close(): void {
    this.readyState = 3
    if (this.onclose) this.onclose.call(this as unknown as WebSocket, new CloseEvent("close"))
  }

  // Simulate periodic price updates
  private startMockUpdates(): void {
    // Simulate crypto price updates
    setInterval(() => {
      if (this.readyState === 1 && this.onmessage) {
        const cryptos = ["bitcoin", "ethereum", "cardano"]
        const crypto = cryptos[Math.floor(Math.random() * cryptos.length)]

        let basePrice = 0
        if (crypto === "bitcoin") {
          basePrice = 50000
        } else if (crypto === "ethereum") {
          basePrice = 3000
        } else if (crypto === "cardano") {
          basePrice = 1.2
        }

        const priceChange = (Math.random() - 0.5) * 5 // -2.5% to +2.5%
        const newPrice = basePrice * (1 + priceChange / 100)

        const message = {
          type: "price_update",
          data: {
            id: crypto,
            price: newPrice,
            priceChange24h: priceChange,
          },
        }

        const event = { data: JSON.stringify(message) } as MessageEvent
        this.onmessage.call(this as unknown as WebSocket, event)
      }
    }, 10000)

    // Simulate weather alerts
    setInterval(() => {
      if (this.readyState === 1 && this.onmessage) {
        const cities = ["New York", "London", "Tokyo"]
        const city = cities[Math.floor(Math.random() * cities.length)]
        const alerts = [
          "Heavy rain expected",
          "High winds warning",
          "Extreme heat alert",
          "Thunderstorm warning",
          "Flash flood warning",
        ]
        const alert = alerts[Math.floor(Math.random() * alerts.length)]

        const message = {
          type: "weather_alert",
          data: {
            city,
            alert,
          },
        }

        const event = { data: JSON.stringify(message) } as MessageEvent
        this.onmessage.call(this as unknown as WebSocket, event)
      }
    }, 30000)
  }
}

export const initializeWebSocket = () => (dispatch: AppDispatch) => {
  try {
    // In a real app, this would connect to a real WebSocket server
    // For this demo, we'll use a mock WebSocket
    const socket = new MockWebSocket("wss://mock-crypto-weather-socket.example.com") as unknown as WebSocket

    socket.onopen = () => {
      dispatch(connected(socket))

      // Subscribe to crypto price updates (in a real app)
      // socket.send(JSON.stringify({ type: 'subscribe', coins: ['bitcoin', 'ethereum', 'cardano'] }));
    }

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data)
        dispatch(messageReceived(message))

        // Handle different message types
        if (message.type === "price_update") {
          const { id, price, priceChange24h } = message.data
          dispatch(updateCryptoPrice({ id, price, priceChange24h }))

          // Add notification for significant price changes (>2%)
          if (Math.abs(priceChange24h) > 2) {
            const direction = priceChange24h > 0 ? "up" : "down"
            const cryptoName = id.charAt(0).toUpperCase() + id.slice(1)

            dispatch(
              addNotification({
                type: "price_alert",
                title: `${cryptoName} price alert`,
                message: `${cryptoName} price has gone ${direction} by ${Math.abs(priceChange24h).toFixed(2)}%`,
              }),
            )
          }
        } else if (message.type === "weather_alert") {
          const { city, alert } = message.data

          dispatch(
            addNotification({
              type: "weather_alert",
              title: `Weather alert for ${city}`,
              message: alert,
            }),
          )
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error)
      }
    }

    socket.onclose = () => {
      dispatch(disconnected())
    }

    socket.onerror = (error) => {
      dispatch(connectionError(error.toString()))
    }

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close()
      }
    }
  } catch (error) {
    dispatch(connectionError("Failed to connect to WebSocket server"))
  }
}

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    connected: (state, action: PayloadAction<WebSocket>) => {
      state.connected = true
      state.socket = action.payload
      state.error = null
    },
    disconnected: (state) => {
      state.connected = false
      state.socket = null
    },
    connectionError: (state, action: PayloadAction<string>) => {
      state.connected = false
      state.socket = null
      state.error = action.payload
    },
    messageReceived: (state, action: PayloadAction<any>) => {
      // This reducer doesn't need to update state, it's just for middleware to intercept
    },
  },
})

export const { connected, disconnected, connectionError, messageReceived } = websocketSlice.actions

export default websocketSlice.reducer

