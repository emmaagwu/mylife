import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AudioList } from "@/components/dashboard/media/AudioList"
import { VisionBoard } from "@/components/dashboard/media/VisionBoard"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Media</h2>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
      </div>

      <Tabs defaultValue="audio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="vision-board">Vision Board</TabsTrigger>
        </TabsList>

        <TabsContent value="audio">
          <Card>
            <CardHeader>
              <CardTitle>Audio Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <AudioList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision-board">
          <Card>
            <CardHeader>
              <CardTitle>Vision Board</CardTitle>
            </CardHeader>
            <CardContent>
              <VisionBoard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}