"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, X } from "lucide-react"

interface IdentityData {
  statement: string
  values: string[]
  mission: string
  vision: string
  purpose: string
}

// Create a separate component for the tabs content
function IdentityTabs() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [identityData, setIdentityData] = useState<IdentityData>({
    statement: "",
    values: [],
    mission: "",
    vision: "",
    purpose: ""
  })
  const [newValue, setNewValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Get the active tab from URL or default to 'identity'
  const activeTab = searchParams.get("tab") || "identity"

  useEffect(() => {
    fetchIdentityData()
  }, [])

  const fetchIdentityData = async () => {
    setIsLoading(true)
    try {
      // Fetch all identity data
      const response = await fetch("/api/user/identity")
      if (!response.ok) throw new Error("Failed to fetch identity data")
      
      const data = await response.json()
      
      // Update state with existing data or defaults
      setIdentityData({
        statement: data?.statement || "",
        values: data?.values || [],
        mission: data?.mission || "",
        vision: data?.vision || "",
        purpose: data?.purpose || ""
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load identity data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/identity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identityData),
      })
      if (!response.ok) throw new Error("Failed to save")
      
      toast({
        title: "Success",
        description: "Your changes have been saved",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    router.push(`/dashboard/identity?tab=${value}`)
  }

  const addValue = () => {
    if (newValue.trim()) {
      setIdentityData(prev => ({
        ...prev,
        values: [...prev.values, newValue.trim()]
      }))
      setNewValue("")
    }
  }

  const removeValue = (index: number) => {
    setIdentityData(prev => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index)
    }))
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
      <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <TabsList className="inline-flex min-w-full sm:w-full h-auto flex-wrap sm:flex-nowrap gap-1 sm:gap-0">
          <TabsTrigger 
            value="identity" 
            className="flex-1 whitespace-nowrap py-2 sm:py-1.5"
          >
            Identity Statement
          </TabsTrigger>
          <TabsTrigger 
            value="mission-values" 
            className="flex-1 whitespace-nowrap py-2 sm:py-1.5"
          >
            Mission & Values
          </TabsTrigger>
          <TabsTrigger 
            value="vision-purpose" 
            className="flex-1 whitespace-nowrap py-2 sm:py-1.5"
          >
            Vision & Purpose
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="identity" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Identity Statement</CardTitle>
            <CardDescription>
              Write a clear statement that defines who you are at your core
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="I am..."
              value={identityData.statement}
              onChange={(e) => setIdentityData(prev => ({ ...prev, statement: e.target.value }))}
              className="min-h-[150px]"
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mission-values" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Core Values</CardTitle>
            <CardDescription>
              List the principles that guide your decisions and actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addValue()}
                placeholder="Add a value..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                disabled={isLoading}
              />
              <Button onClick={addValue} size="sm" disabled={isLoading}>
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {identityData.values.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                >
                  {value}
                  <button 
                    onClick={() => removeValue(index)} 
                    className="ml-1"
                    disabled={isLoading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission Statement</CardTitle>
            <CardDescription>
              Define your life's mission and what you aim to achieve
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="My mission is..."
              value={identityData.mission}
              onChange={(e) => setIdentityData(prev => ({ ...prev, mission: e.target.value }))}
              className="min-h-[150px]"
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vision-purpose" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Life Vision</CardTitle>
            <CardDescription>
              Describe the future you want to create
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="In the future, I see..."
              value={identityData.vision}
              onChange={(e) => setIdentityData(prev => ({ ...prev, vision: e.target.value }))}
              className="min-h-[150px]"
              disabled={isLoading}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Life Purpose</CardTitle>
            <CardDescription>
              Articulate why you do what you do
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="My purpose is..."
              value={identityData.purpose}
              onChange={(e) => setIdentityData(prev => ({ ...prev, purpose: e.target.value }))}
              className="min-h-[150px]"
              disabled={isLoading}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default function IdentityPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Core Identity</h2>
          <p className="text-muted-foreground mt-2">
            Define who you are and what you stand for
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }>
        <IdentityTabs />
      </Suspense>

      {/* Optional: Add loading indicator */}
      {isLoading && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
            Loading...
          </div>
        </div>
      )}
    </div>
  )
}
