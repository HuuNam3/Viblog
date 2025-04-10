import { NextResponse } from "next/server"
import { clearSession } from "@/app/lib/auth"

export async function POST() {
  try {
    await clearSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in POST /api/auth/logout:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
