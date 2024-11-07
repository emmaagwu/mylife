import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookList } from "@/components/dashboard/library/BookList"
import { QuoteList } from "@/components/dashboard/library/QuoteList"
import { NoteList } from "@/components/dashboard/library/NoteList"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Library</h2>
      </div>

      <Tabs defaultValue="books" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="quotes">Quotes</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>

        <TabsContent value="books">
          <BookList />
        </TabsContent>

        <TabsContent value="quotes">
          <QuoteList />
        </TabsContent>

        <TabsContent value="notes">
          <NoteList />
        </TabsContent>
      </Tabs>
    </div>
  )
}