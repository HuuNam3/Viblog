"use client"

import React from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { createUser } from "@/lib/auth"

const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
    name: z.string().min(1, "Please enter your name"),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const callbackUrl = searchParams?.get("callbackUrl") || "/login";
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "", 
            name: "",
            role: "user",
        },
    });
  
    const onSubmit = async (data: RegisterFormData) => {
      try {
          const userName = data.username
          const pass = data.password
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { confirmPassword, ...registerData } = data;
          const res = await createUser(registerData)
          console.log(res)

          if (res) {
            toast.success("Registration successful! 🎉", {
              description: "You can now log in with your new account.",
            })
          } else {
            toast.error("Registration failed 😢", {
              description: "Please try again later.",
            })
          }
          router.push(callbackUrl);
      } catch (error: any) {
        toast.error("Registration failed 😢", {
          description: error.message,
        })
      }
    };

  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Sign up to start sharing your thoughts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                        className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                disabled={form.formState.isSubmitting}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </Form>
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
  )
}