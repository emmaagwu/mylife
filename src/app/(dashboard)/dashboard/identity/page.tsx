"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function IdentityPage() {
  const [identityData, setIdentityData] = useState({
    statement: "",
    values: [] as string[],
    mission: "",
    purpose: "",
    drivers: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("fetching identity data")
        const response = await fetch("/api/user/identity", {
          method: "GET",
        })
        if (!response.ok) throw new Error("Failed to fetch identity data")
        const data = await response.json()
        setIdentityData(data || {})
      } catch (error: any) {
        setError(error.message)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    if (field === 'values' || field === 'drivers') {
      const arrayValue = value.split(',').map(item => item.trim())
      setIdentityData(prevData => ({ ...prevData, [field]: arrayValue }))
    } else {
      setIdentityData(prevData => ({ ...prevData, [field]: value }))
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/user/identity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(identityData),
      })
      if (!response.ok) throw new Error("Failed to update identity data")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Core Identity</h2>
      </div>

      <Tabs defaultValue="identity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="identity">Identity Statement</TabsTrigger>
          <TabsTrigger value="values">Values & Mission</TabsTrigger>
          <TabsTrigger value="purpose">Purpose & Vision</TabsTrigger>
        </TabsList>

        <TabsContent value="identity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identity Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={identityData.statement || ""}
                onChange={(e) => handleInputChange("statement", e.target.value)}
                placeholder="Set your identity statement"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="values" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={identityData.values.join(', ')}
                onChange={(e) => handleInputChange("values", e.target.value)}
                placeholder="Set your values (comma-separated, e.g.: Integrity, Innovation)"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={identityData.mission || ""}
                onChange={(e) => handleInputChange("mission", e.target.value)}
                placeholder="Set your mission statement"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purpose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Life Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={identityData.purpose || ""}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
                placeholder="Set your life purpose"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Life Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={identityData.drivers.join(', ')}
                onChange={(e) => handleInputChange("drivers", e.target.value)}
                placeholder="Set your life vision (comma-separated)"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button onClick={handleSave} className="mt-4" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
