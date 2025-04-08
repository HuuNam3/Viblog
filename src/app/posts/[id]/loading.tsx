import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/posts" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Posts</span>
        </Link>
      </Button>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <Skeleton className="h-10 w-[300px]" />
              <div className="flex gap-4">
                <Skeleton className="h-5 w-[120px]" />
                <Skeleton className="h-5 w-[120px]" />
              </div>
            </div>
            <Skeleton className="h-9 w-[100px]" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Skeleton className="h-5 w-[80px]" />
        </CardFooter>
      </Card>
    </div>
  )
}
