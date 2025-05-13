import { ApiHandler } from "@/lib/api-handler"
import { Contact } from "@/types/contact"

const CONTACTS_FILE_PATH = "src/app/data/contacts.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  
  return ApiHandler.handleGet<Contact>(CONTACTS_FILE_PATH, {
    pagination: {
      page,
      limit: 10
    }
  })
}

export async function POST(request: Request) {
  const data = await request.json()
  
  return ApiHandler.handlePost<Contact>(CONTACTS_FILE_PATH, data, {
    validate: (data) => {
      if (!data.name) return "Name is required"
      if (!data.email) return "Email is required"
      if (!data.message) return "Message is required"
      return true
    }
  })
}
