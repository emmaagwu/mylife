"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PlusCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Quote } from "@/types/home"
import Image from "next/image"
import type { VisionBoardData } from "@/types/home"

interface InspirationZoneProps {
  quotes: Array<{
    id: string;
    text: string;
    author: string;
    isFavorite: boolean;
  }>;
  visionBoard: VisionBoardData;
  isLoading: boolean;
}

export function InspirationZone({ quotes, visionBoard, isLoading }: InspirationZoneProps) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        
        <Card className="p-6">
          <div className="space-y-4">
            <div className="text-center">
              <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/4 mx-auto" />
            </div>
            <div className="flex justify-center gap-2">
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Skeleton key={index} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Inspiration Zone</h2>

      <Card className="p-6">
        <div className="space-y-4">
          {quotes.length > 0 && (
            <>
              <div className="text-center">
                <p className="text-xl italic mb-2">"{quotes[currentQuoteIndex].text}"</p>
                <p className="text-sm text-muted-foreground">- {quotes[currentQuoteIndex].author}</p>
              </div>

              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentQuoteIndex((prev) => 
                    prev === 0 ? quotes.length - 1 : prev - 1
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentQuoteIndex((prev) => 
                    prev === quotes.length - 1 ? 0 : prev + 1
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Vision Board</h3>
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </div>

        {visionBoard.isPlaceholder && (
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            {visionBoard.message}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {visionBoard.images.map((imageUrl, index) => (
            <div 
              key={index} 
              className="relative aspect-[4/3] rounded-lg overflow-hidden group"
            >
              <Image
                src={imageUrl}
                alt={`Vision board image ${index + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {visionBoard.isPlaceholder && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="sm">
                    Replace Image
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}