import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Đường dẫn tuyệt đối đến file JSON
    const filePath = path.join(process.cwd(), "src/app/data/contacts.json")

    // Đọc dữ liệu cũ
    const fileData = fs.readFileSync(filePath, "utf-8")
    const contacts = JSON.parse(fileData)

    // Tạo id mới
    const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1
    const newContact = { id: newId, ...data }

    // Thêm vào danh sách
    contacts.push(newContact)

    // Ghi lại vào file JSON
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2))

    return NextResponse.json({ message: "Success", contact: newContact }, { status: 200 })
  } catch (error) {
    console.error("Error saving contact:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
