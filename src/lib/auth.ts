import { cookies } from "next/headers"
import fs from "fs/promises"
import path from "path"
import { redirect } from "next/navigation"
import crypto from "crypto"

// Define the User type
export interface User {
  id: number
  username: string
  email: string
  password: string
  name: string
  role: "admin" | "user"
  createdAt: string
}

// Function to get all users from the JSON file
export async function getUsers(): Promise<User[]> {
  try {
    const filePath = path.join(process.cwd(), "app/data/accounts.json")
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading users:", error)
    return []
  }
}

// Function to save users to the JSON file
export async function saveUsers(users: User[]): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), "app/data/accounts.json")
    await fs.writeFile(filePath, JSON.stringify(users, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving users:", error)
    throw new Error("Failed to save user data")
  }
}

// Function to hash a password
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

// Function to verify a password
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const hashed = hashPassword(password)
  return hashed === hashedPassword
}

// Function to get the current user from the session
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("sessionId")?.value

  if (!sessionId) {
    return null
  }

  try {
    const users = await getUsers()
    const user = users.find((user) => hashPassword(user.id.toString()) === sessionId)

    if (!user) {
      return null
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword as User
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Function to check if the user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}

// Function to require authentication (redirect if not authenticated)
export async function requireAuth(redirectTo = "/login") {
  const isAuthed = await isAuthenticated()

  if (!isAuthed) {
    // Store the current URL to redirect back after login
    const url = new URL(redirectTo, "http://localhost")
    url.searchParams.set("callbackUrl", "/posts/new")
    redirect(url.pathname + url.search)
  }
}

// Function to create a session for a user
export async function createSession(user: User): Promise<void> {
  const cookieStore = cookies()

  // Create a session ID based on the user ID (in a real app, use a more secure method)
  const sessionId = hashPassword(user.id.toString())

  // Set the session cookie (expires in 24 hours)
  cookieStore.set("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

// Function to clear the session
export async function clearSession(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("sessionId")
}

// Function to find a user by username or email
export async function findUserByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
  const users = await getUsers()
  return users.find((user) => user.username === usernameOrEmail || user.email === usernameOrEmail) || null
}

// Function to create a new user
export async function createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
  const users = await getUsers()

  // Check if username or email already exists
  const existingUser = users.find((user) => user.username === userData.username || user.email === userData.email)

  if (existingUser) {
    throw new Error(existingUser.username === userData.username ? "Username already exists" : "Email already exists")
  }

  // Generate a new ID
  const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1

  // Create the new user
  const newUser: User = {
    id: newId,
    ...userData,
    createdAt: new Date().toISOString(),
  }

  // Add the new user to the array
  users.push(newUser)

  // Save the updated users array
  await saveUsers(users)

  // Return the new user without password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword as User
}
