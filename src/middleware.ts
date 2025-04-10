import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is /posts/new
  const isProtectedRoute = path === "/posts/new"

  // Get the authentication status from the cookie
  const isLoggedIn = request.cookies.has("sessionId")

  // If the route is protected and the user is not logged in, redirect to the login page
  if (isProtectedRoute && !isLoggedIn) {
    // Create the URL for the login page with a callback URL
    const url = new URL("/login", request.url)
    url.searchParams.set("callbackUrl", path)

    // Redirect to the login page
    return NextResponse.redirect(url)
  }

  // Continue with the request if the user is logged in or the route is not protected
  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/posts/new"],
}
