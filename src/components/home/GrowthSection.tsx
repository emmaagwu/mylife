"use client"

import { Card } from "@/components/ui/card"
import { Book, Trophy, Users } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Book as BookType, Achievement, Mentor } from "@/types/home"

interface GrowthSectionProps {
  data: {
    books: BookType[];
    achievements: Achievement[];
    mentors: Mentor[];
  } | null;
  isLoading: boolean;
}

export function GrowthSection({ data, isLoading }: GrowthSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />

        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-32" />
                </div>
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Growth Journey</h2>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-5 w-5" />
            <h3 className="font-semibold">Current Reads</h3>
          </div>
          {data.books.map((book) => (
            <div key={book.id} className="space-y-2">
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5" />
            <h3 className="font-semibold">Recent Achievements</h3>
          </div>
          {data.achievements.map((achievement) => (
            <div key={achievement.id} className="mb-3">
              <p className="font-medium">{achievement.title}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(achievement.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h3 className="font-semibold">Mentors & Role Models</h3>
          </div>
          {data.mentors.map((mentor) => (
            <div key={mentor.id} className="mb-3">
              <p className="font-medium">{mentor.name}</p>
              <p className="text-sm text-muted-foreground">{mentor.expertise}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}