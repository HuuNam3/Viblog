import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, LogIn, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { findUserByUsernameOrEmail, verifyPassword, createSession } from "../lib/auth"

// Server action to handle login
async function login(formData: FormData) {
  "use server"

  const usernameOrEmail = formData.get("usernameOrEmail") as string
  const password = formData.get("password") as string
  const callbackUrl = (formData.get("callbackUrl") as string) || "/posts"

  // Validate form data
  if (!usernameOrEmail || !password) {
    return { error: "Username/email and password are required" }
  }

  try {
    // Find the user
    const user = await findUserByUsernameOrEmail(usernameOrEmail)

    // Check if user exists and password is correct
    if (!user || !verifyPassword(password, user.password)) {
      return { error: "Invalid username/email or password" }
    }

    // Create a session
    await createSession(user)

    // Redirect to the callback URL or posts page
    redirect(callbackUrl)
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login. Please try again." }
  }
}

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string
    error?: string
  }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  const callbackUrl = searchParams.callbackUrl || "/posts"
  const error = searchParams.error

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-purple-700 hover:text-purple-800 transition-colors"
            >
              <Sparkles className="h-5 w-5" />
              <span>Spectrum Blog</span>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-gray-700 hover:text-purple-700 hover:bg-purple-50"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form action={login} className="space-y-4">
              <input type="hidden" name="callbackUrl" value={callbackUrl} />

              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail">Username or Email</Label>
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  placeholder="Enter your username or email"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs text-purple-600 hover:text-purple-800">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Spectrum Blog. All rights reserved.
      </footer>
    </div>
  )
}
