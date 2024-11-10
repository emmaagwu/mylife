"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { useState } from "react"

const audioFiles = [
  {
    id: 1,
    title: "Morning Motivation",
    duration: "5:30",
    url: "/audio/morning-motivation.mp3",
    category: "Motivation",
  },
  // Add more audio files...
]

export function AudioList() {
  const [playing, setPlaying] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {audioFiles.map((audio) => (
        <Card key={audio.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{audio.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {audio.category} • {audio.duration}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPlaying(playing === audio.id ? null : audio.id)}
                >
                  {playing === audio.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 