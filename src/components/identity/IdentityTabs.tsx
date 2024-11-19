"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { PlusCircle, X } from "lucide-react"

interface IdentityData {
  statement: string
  values: string[]
  mission: string
  vision: string
  purpose: string
}

export function IdentityTabs() {
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
  const [isLoading, setIsLoading] = useState(true)

  const activeTab = searchParams.get("tab") || "identity"

  // Fetch identity data
  useEffect(() => {
    async function fetchIdentityData() {
      try {
        const response = await fetch("/api/user/identity")
        if (!response.ok) throw new Error("Failed to fetch identity data")
        
        const data = await response.json()
        setIdentityData({
          statement: data.statement || "",
          values: data.values || [],
          mission: data.mission || "",
          vision: data.vision || "",
          purpose: data.purpose || ""
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

    fetchIdentityData()
  }, [])

  // Manual save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/identity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(identityData),
      })

      if (!response.ok) throw new Error("Failed to save identity data")

      window.dispatchEvent(new CustomEvent("identity-saved", { detail: { success: true } }))
      toast({
        title: "Success",
        description: "Identity data saved successfully",
      })
    } catch (error) {
      window.dispatchEvent(new CustomEvent("identity-saved", { detail: { success: false } }))
      toast({
        title: "Error",
        description: "Failed to save identity data",
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
    <form id="identity-form" onSubmit={handleSubmit}>
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
                />
                <Button onClick={addValue} size="sm">
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
                    <button onClick={() => removeValue(index)} className="ml-1">
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
              />
            </CardContent>
          </Card>
        </TabsContent>
        {isLoading && (
          <div className="fixed bottom-4 right-4">
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm">
              Saving...
            </div>
          </div>
        )}
      </Tabs>
    </form>
  )
}