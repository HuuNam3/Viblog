"use client"

import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

export default function LoginButton() {
  const { user, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled className="opacity-50">
        <User className="h-4 w-4 mr-2" />
        <span>Loading...</span>
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 bg-purple-50 px-3 py-1 rounded-full">
          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">
            {user.name.charAt(0)}
          </div>
          <span>{user.name}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
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
