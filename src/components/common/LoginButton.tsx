"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface UserData {
  id: number
  username: string
  name: string
  email: string
  role: string
}

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check login status on component mount
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setIsLoggedIn(true)
          setUserData(data.user)
        } else {
          setIsLoggedIn(false)
          setUserData(null)
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        setIsLoggedIn(false)
        setUserData(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkLoginStatus()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        setIsLoggedIn(false)
        setUserData(null)

        // Refresh the page to update the UI
        router.refresh()
      } else {
        
      }
    } catch (error) {
      console.error("Logout error:", error)
      
    }
  }

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="opacity-50">
        <User className="h-4 w-4 mr-2" />
        <span>Loading...</span>
      </Button>
    )
  }

  if (isLoggedIn && userData) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 bg-purple-50 px-3 py-1 rounded-full">
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">
            {userData.name.charAt(0)}
          </div>
          <span>{userData.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="default"
      size="sm"
      asChild
      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
    >
      <Link href="/login">
        <LogIn className="h-4 w-4" />
        <span>Login</span>
      </Link>
    </Button>
  )
}
