"use client"


import { useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import NewsCard from "@/components/news/news-card"

export default function NewsSection() {
  const { news, loading, error } = useSelector((state: RootState) => state.news)

  if (loading && news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>News</CardTitle>
          <CardDescription>Latest cryptocurrency and financial news</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[80px] w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>News</CardTitle>
          <CardDescription>Latest cryptocurrency and financial news</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">Error loading news data: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>News</CardTitle>
        <CardDescription>Latest cryptocurrency and financial news</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.slice(0, 5).map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

