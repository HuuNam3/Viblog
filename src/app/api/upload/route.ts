import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readdir } from 'fs/promises';
import path from 'path';

// Hàm tạo tên file mới
async function generateUniqueFilename(uploadDir: string, originalFilename: string): Promise<string> {
  const ext = path.extname(originalFilename); // Lấy phần mở rộng (.jpg, .png, etc.)
  
  try {
    // Đọc danh sách file trong thư mục
    const files = await readdir(uploadDir);
    
    // Lọc ra các file có tiền tố "anh" và lấy số lớn nhất
    let maxNumber = 0;
    files.forEach(file => {
      if (file.startsWith('anh')) {
        const match = file.match(/anh(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
          if (num > maxNumber) maxNumber = num;
        }
      }
    });

    // Tạo tên file mới với số tiếp theo
    return `anh${maxNumber + 1}${ext}`;
  } catch (error) {
    // Nếu có lỗi (ví dụ: thư mục chưa tồn tại), bắt đầu từ 1
    return `anh1${ext}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file received.' },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng file
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG and PNG are allowed.' },
        { status: 400 }
      );
    }

    // Chuyển đổi file thành ArrayBuffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Tạo đường dẫn đầy đủ đến thư mục public/images
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    
    try {
      // Tạo thư mục nếu chưa tồn tại
      await writeFile(path.join(uploadDir, '.keep'), '');
    } catch (error) {
      // Bỏ qua lỗi nếu thư mục đã tồn tại
    }

    // Tạo tên file mới
    const filename = await generateUniqueFilename(uploadDir, file.name);
    
    // Ghi file
    await writeFile(path.join(uploadDir, filename), buffer);

    // Trả về đường dẫn của file đã upload
    return NextResponse.json({ 
      message: 'Upload successful',
      path: `/images/${filename}` 
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file.' },
      { status: 500 }
    );
  }
} 