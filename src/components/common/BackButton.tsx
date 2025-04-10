import React from 'react'
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackButton() {
  return (
    <Link href="/">
      <Button variant="ghost" className="flex cursor-pointer items-center gap-2 pl-0 hover:pl-1 transition-all">
        <ArrowLeft className="h-4 w-4" />
        Back to Posts
      </Button>
    </Link>
  )
}

