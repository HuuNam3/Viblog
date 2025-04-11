"use client";

import { useState } from "react";
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/common/Header";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams(); // Sử dụng useSearchParams để truy cập searchParams

  const callbackUrl = searchParams?.get("callbackUrl") || "/posts";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("Data being sent:", { usernameOrEmail, password });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error("Login failed 😢", {
          description: data.message,
        })
        throw new Error(data.error || "Login failed");
      }
      if (res) {
        toast.success("Login successful! 🎉", {
          description: "You can now create posts.",
        })
      } else {
        toast.error("Login failed 😢", {
          description: "Please try again later.",
        })
      }

      // Đăng nhập thành công, chuyển hướng người dùng
      router.push(callbackUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-white">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail">Username or Email</Label>
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  placeholder="Enter your username or email"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={loading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
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
  );
}