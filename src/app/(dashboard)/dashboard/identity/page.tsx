"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function IdentityPage() {
  const [identityData, setIdentityData] = useState({
    identityStatement: "",
    missionStatement: "",
    coreValues: "",
    lifePurpose: "",
    lifeVision: "",
  })

  useEffect(() => {
    // Fetch user data from the database
    async function fetchData() {
      const response = await fetch("/api/user/identity")
      const data = await response.json()
      setIdentityData(data)
    }
    fetchData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setIdentityData((prevData) => ({ ...prevData, [field]: value }))
  }

  const handleSave = async () => {
    // Save updated data to the database
    await fetch("/api/user/identity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(identityData),
    })
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
                value={identityData.identityStatement}
                onChange={(e) => handleInputChange("identityStatement", e.target.value)}
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
                value={identityData.coreValues}
                onChange={(e) => handleInputChange("coreValues", e.target.value)}
                placeholder="Set your values (e.g., Integrity, Innovation)"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mission Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={identityData.missionStatement}
                onChange={(e) => handleInputChange("missionStatement", e.target.value)}
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
                value={identityData.lifePurpose}
                onChange={(e) => handleInputChange("lifePurpose", e.target.value)}
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
                value={identityData.lifeVision}
                onChange={(e) => handleInputChange("lifeVision", e.target.value)}
                placeholder="Set your life vision"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="mt-4">
        Save Changes
      </Button>
    </div>
  )
}