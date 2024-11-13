"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit2, Quote, Target, Compass, Heart, Lightbulb, GripVertical } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import type { CoreIdentityData } from "@/types/home"
import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableCardProps {
  id: string
  children: React.ReactNode
}

function SortableCard({ id, children }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.9 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="group relative">
        <div
          {...listeners}
          className="absolute -left-8 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 cursor-grab transition-opacity"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        {children}
      </div>
    </div>
  )
}

const defaultOrder = ['statement', 'values', 'mission', 'vision', 'purpose']

export function CoreIdentity({ data, isLoading }: { data: CoreIdentityData; isLoading: boolean }) {
  const router = useRouter()
  const [order, setOrder] = useState(defaultOrder)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  if (isLoading) {
    return <CoreIdentitySkeletons />
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setOrder((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const cards = {
    statement: (
      <Card className="group p-6 border-2 border-purple-500/20 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-950/20 hover:border-purple-500/40 transition-all">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 bg-purple-100 dark:bg-purple-900/30 group-hover:scale-105 transition-transform">
            <Quote className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-xl font-semibold group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
              Identity Statement
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
              {data.statement || "Define your identity statement in the dashboard →"}
            </p>
          </div>
        </div>
      </Card>
    ),
    values: (
      <Card className="group p-6 border-2 border-blue-500/20 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 hover:border-blue-500/40 transition-all">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30 group-hover:scale-105 transition-transform">
            <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="space-y-3 flex-1">
            <h3 className="text-lg font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              Core Values
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.values?.length > 0 ? (
                data.values.map((value) => (
                  <span
                    key={value}
                    className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium group-hover:scale-105 transition-transform"
                  >
                    {value}
                  </span>
                ))
              ) : (
                <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Define your core values →
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    ),
    mission: (
      <Card className="group p-6 border-2 border-green-500/20 bg-gradient-to-br from-green-50 to-transparent dark:from-green-950/20 hover:border-green-500/40 transition-all">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30 group-hover:scale-105 transition-transform">
            <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
              Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
              {data.mission || "Define your mission →"}
            </p>
          </div>
        </div>
      </Card>
    ),
    vision: (
      <Card className="group p-6 border-2 border-amber-500/20 bg-gradient-to-br from-amber-50 to-transparent dark:from-amber-950/20 hover:border-amber-500/40 transition-all">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30 group-hover:scale-105 transition-transform">
            <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-semibold group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
              {data.vision || "Define your vision →"}
            </p>
          </div>
        </div>
      </Card>
    ),
    purpose: (
      <Card className="group p-6 border-2 border-rose-500/20 bg-gradient-to-br from-rose-50 to-transparent dark:from-rose-950/20 hover:border-rose-500/40 transition-all">
        <div className="flex items-start gap-4">
          <div className="rounded-full p-3 bg-rose-100 dark:bg-rose-900/30 group-hover:scale-105 transition-transform">
            <Compass className="h-6 w-6 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-semibold group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
              Purpose
            </h3>
            <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
              {data.purpose || "Define your purpose →"}
            </p>
          </div>
        </div>
      </Card>
    ),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Core Identity</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Drag cards to reorder • Click Edit to update
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/dashboard/identity')} className="gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Identity
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-6">
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            {order.map((id) => (
              <SortableCard key={id} id={id}>
                {cards[id as keyof typeof cards]}
              </SortableCard>
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  )
}

function CoreIdentitySkeletons() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-[200px] w-full" />
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[180px]" />
          ))}
        </div>
      </div>
    </div>
  )
} 