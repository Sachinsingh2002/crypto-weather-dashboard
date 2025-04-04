import { Card, CardContent } from "@/components/ui/card"
import type { News } from "@/types/news"

interface NewsCardProps {
  article: News
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {article.imageUrl && (
              <div className="md:w-1/4 flex-shrink-0">
                <img
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-20 object-cover rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=80&width=120"
                  }}
                />
              </div>
            )}
            <div className={article.imageUrl ? "md:w-3/4" : "w-full"}>
              <h3 className="font-medium line-clamp-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{article.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground">{article.source}</span>
                <span className="text-xs text-muted-foreground">{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

