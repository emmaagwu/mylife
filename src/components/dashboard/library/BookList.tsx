"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    progress: 75,
    coverUrl: "/book-covers/atomic-habits.jpg",
  },
  // Add more books...
]

export function BookList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card key={book.id}>
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <div className="w-24 h-36 bg-muted rounded-md" />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
                <div className="space-y-1">
                  <Progress value={book.progress} />
                  <p className="text-xs text-muted-foreground">
                    {book.progress}% complete
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 