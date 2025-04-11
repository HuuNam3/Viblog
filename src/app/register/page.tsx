import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, UserPlus, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createUser, hashPassword } from "../../lib/auth"

// Server action to handle registration
async function register(formData: FormData) {
  "use server"

  const username = formData.get("username") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const name = formData.get("name") as string

  // Validate form data
  if (!username || !email || !password || !confirmPassword || !name) {
    return { error: "All fields are required" }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" }
  }

  try {
    // Create the user
    await createUser({
      username,
      email,
      password: hashPassword(password),
      name,
      role: "user",
    })

    // Redirect to login page
    redirect("/login?success=true")
  } catch (error: any) {
    console.error("Registration error:", error)
    return { error: error.message || "An error occurred during registration. Please try again." }
  }
}

interface RegisterPageProps {
  searchParams: {
    error?: string
  }
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
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
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form action={register} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
                <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:text-purple-800 font-medium">
                Sign in
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
