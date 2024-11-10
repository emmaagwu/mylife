import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MentorList } from "@/components/dashboard/network/MentorList"
import { ConnectionList } from "@/components/dashboard/network/ConnectionList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function NetworkPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Network</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mentors</CardTitle>
              <Button variant="outline" size="sm">
                Add Mentor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <MentorList />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Connections</CardTitle>
              <Button variant="outline" size="sm">
                Add Connection
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ConnectionList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}