"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { FileUp } from "lucide-react";
import { getCurrentUser, User } from "@/lib/auth"; 

const formSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  excerpt: z.string().min(1, "Please enter an excerpt"),
  image: z.string(),
  content: z.string().min(1, "Please enter the post content"),
});

type PostFormData = z.infer<typeof formSchema>;

export default function CreatePostForm() {
  const [userId, setUserID] = useState<User>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams?.get("callbackUrl") || "/posts";

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const user = await getCurrentUser()
        setUserID(user || [])
        setLoading(false)
      } catch (error) {
        console.error("Error checking login status:", error)
      }
    }

    checkLoginStatus()
  }, [userId])
  
  const form = useForm<PostFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      image: "/placeholder.svg?height=600&width=1200",
      content: "",
    },
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          like: 0,
          author: userId.name,
          date,
        }),
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Post created successfully! 🎉", {
          description: "Your post has been published.",
        });
        form.reset();
      } else {
        toast.error("Something went wrong 😢", {
          description: responseData.message || "Please try again later.",
        });
      }
      router.push(callbackUrl);
    } catch (error) {
      toast.error("An unexpected error occurred 😢", {
        description: "Please try again later.",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-lg overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>All fields are required to publish your post.</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
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
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Excerpt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a short excerpt or summary"
                      {...field}
                      className="h-20 border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL"
                      {...field}
                      className="border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                    />
                  </FormControl>
                  <p className="text-sm text-gray-500">
                    Enter a URL for the featured image. You can use placeholder.svg for testing.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content here..."
                      {...field}
                      className="h-64 border-gray-300 focus:border-purple-300 focus:ring-purple-500"
                    />
                  </FormControl>
                  <p className="text-sm text-gray-500">
                    Use double line breaks (\n\n) to create new paragraphs.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? <div>loading...</div> : (
              <>
                {userId && (
                  <div className="bg-purple-50 p-4 rounded-lg flex items-center gap-3 text-sm text-purple-700">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold">
                      {userId?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">Publishing as {userId.name}</p>
                      <p className="text-xs text-purple-600">
                        Your name will be displayed as the author of this post
                      </p>
                    </div>
                  </div>
                )}
              </>)
            }

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              disabled={form.formState.isSubmitting}
            >
              <FileUp className="h-4 w-4 mr-2" />
              {form.formState.isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}