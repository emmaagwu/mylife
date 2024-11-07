import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function PlanningPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Planning</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Plan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Long-Term Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add long-term goals component */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add monthly goals component */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add weekly goals component */}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goal Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add timeline component */}
        </CardContent>
      </Card>
    </div>
  )
}