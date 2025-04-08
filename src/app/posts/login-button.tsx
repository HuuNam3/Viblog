"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
//   const { toast } = useToast()

  // Check login status on component mount
  useEffect(() => {
    const loginStatus = document.cookie.includes("isLoggedIn=true")
    setIsLoggedIn(loginStatus)
  }, [])

  const handleLogin = () => {
    // Set a cookie to simulate login (expires in 1 hour)
    document.cookie = "isLoggedIn=true; path=/; max-age=3600"
    setIsLoggedIn(true)

    // toast({
    //   title: "Logged in successfully",
    //   description: "You now have access to create new posts.",
    // })

    // Refresh the page to update the UI
    router.refresh()
  }

  const handleLogout = () => {
    // Remove the cookie to simulate logout
    document.cookie = "isLoggedIn=; path=/; max-age=0"
    setIsLoggedIn(false)

    // toast({
    //   title: "Logged out successfully",
    //   description: "You have been logged out of your account.",
    // })

    // Refresh the page to update the UI
    router.refresh()
  }

  return isLoggedIn ? (
    <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  ) : (
    <Button variant="default" size="sm" onClick={handleLogin} className="flex items-center gap-2">
      <LogIn className="h-4 w-4" />
      <span>Login</span>
    </Button>
  )
}
