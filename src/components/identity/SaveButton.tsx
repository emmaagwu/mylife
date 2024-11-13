"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function SaveButton() {
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleSaved = (event: CustomEvent) => {
      if (event.detail.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
      setIsLoading(false)
    }

    window.addEventListener('identity-saved', handleSaved as EventListener)
    return () => {
      window.removeEventListener('identity-saved', handleSaved as EventListener)
    }
  }, [])

  const handleClick = () => {
    setIsLoading(true)
    const form = document.getElementById("identity-form") as HTMLFormElement
    form.requestSubmit()
  }

  return (
    <Button 
      type="submit"
      form="identity-form"
      disabled={isLoading}
      className="min-w-[100px] transition-all"
    >
      {isLoading ? (
        "Saving..."
      ) : saved ? (
        <span className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          Saved
        </span>
      ) : (
        "Save Changes"
      )}
    </Button>
  )
} 