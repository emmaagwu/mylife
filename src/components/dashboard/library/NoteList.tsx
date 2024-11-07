"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Tag } from "lucide-react"

const notes = [
  {
    id: 1,
    title: "Weekly Reflection",
    content: "This week I learned the importance of...",
    date: "2024-01-15",
    tags: ["reflection", "personal growth"],
    category: "Journal",
  },
  // Add more notes...
]

export function NoteList() {
  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{note.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(note.date).toLocaleDateString()} • {note.category}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-sm leading-relaxed line-clamp-3">
                {note.content}
              </p>

              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div className="flex gap-1">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 