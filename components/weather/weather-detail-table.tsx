import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { WeatherHistory } from "@/types/weather"

interface WeatherDetailTableProps {
  data: WeatherHistory[]
}


export default function WeatherDetailTable({ data }: WeatherDetailTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No historical data available</p>
      </div>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Temperature (°C)</TableHead>
            <TableHead>Humidity (%)</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Wind Speed (km/h)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.date}>
              <TableCell>{formatDate(item.date)}</TableCell>
              <TableCell>{item.temp}</TableCell>
              <TableCell>{item.humidity}</TableCell>
              <TableCell className="capitalize">{item.condition}</TableCell>
              <TableCell>{item.windSpeed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

