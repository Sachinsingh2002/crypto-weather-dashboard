import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { CryptoDetail } from "@/types/crypto"

interface CryptoDetailTableProps {
  data: CryptoDetail
}

export default function CryptoDetailTable({ data }: CryptoDetailTableProps) {
  const formatNumber = (value: number, options: Intl.NumberFormatOptions = {}) => {
    return new Intl.NumberFormat("en-US", options).format(value)
  }

  const formatCurrency = (value: number) => {
    return formatNumber(value, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const metrics = [
    { label: "Market Cap", value: formatCurrency(data.marketCap) },
    { label: "Volume (24h)", value: formatCurrency(data.volume24h) },
    { label: "Circulating Supply", value: formatNumber(data.circulatingSupply) },
    { label: "Total Supply", value: formatNumber(data.totalSupply) },
    { label: "Max Supply", value: data.maxSupply ? formatNumber(data.maxSupply) : "Unlimited" },
    { label: "All-Time High", value: formatCurrency(data.allTimeHigh) },
    { label: "All-Time High Date", value: new Date(data.allTimeHighDate).toLocaleDateString() },
    {
      label: "Price Change (7d)",
      value: formatPercentage(data.priceChange7d),
      className: data.priceChange7d >= 0 ? "text-green-500" : "text-red-500",
    },
    {
      label: "Price Change (30d)",
      value: formatPercentage(data.priceChange30d),
      className: data.priceChange30d >= 0 ? "text-green-500" : "text-red-500",
    },
    {
      label: "Price Change (1y)",
      value: formatPercentage(data.priceChange1y),
      className: data.priceChange1y >= 0 ? "text-green-500" : "text-red-500",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.label}>
              <TableCell>{metric.label}</TableCell>
              <TableCell className={metric.className}>{metric.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

