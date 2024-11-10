"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Quote } from "@/types/home"
import Image from "next/image"
interface InspirationZoneProps {
  quotes?: Quote[];
  visionBoard?: string[];
  isLoading: boolean;
}

export function InspirationZone({ quotes = [], visionBoard = [], isLoading }: InspirationZoneProps) {
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
    <div className="space-y-4">
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

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {visionBoard.map((image, index) => (
          <Card key={index} className="aspect-square relative overflow-hidden">
            <Image
              src={image}
              alt={`Vision board item ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </Card>
        ))}
      </div>
    </div>
  )
}