"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Quote, Heart, Share2, BookMarked } from "lucide-react"

const quotes = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    source: "Stanford Commencement Speech",
    tags: ["motivation", "work", "passion"],
    isFavorite: true,
  },
  // Add more quotes...
]

export function QuoteList() {
  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <Card key={quote.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Quote className="h-6 w-6 text-muted-foreground shrink-0 mt-1" />
                <div className="space-y-2">
                  <p className="text-lg font-medium leading-relaxed">
                    {quote.text}
                  </p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">— {quote.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {quote.source}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {quote.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Heart 
                      className={`h-4 w-4 ${
                        quote.isFavorite ? "fill-current text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BookMarked className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 