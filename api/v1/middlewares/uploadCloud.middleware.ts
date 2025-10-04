import multer from 'multer'
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary'
import streamifier from 'streamifier'
import sharp from 'sharp'
import { Request, Response, NextFunction } from 'express'

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// Multer memoryStorage
const storage = multer.memoryStorage()
export const upload = multer({ storage })

// Type-safe file
interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer
}

// Middleware upload + resize + Cloudinary (hỗ trợ 1 file hoặc nhiều file)
export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Hỗ trợ cả single file (req.file) và multiple files (req.files)
    const files: CloudinaryFile[] =
      (req.files as CloudinaryFile[]) ||
      (req.file ? [req.file as CloudinaryFile] : [])

    if (!files || files.length === 0) {
      return next() // Không có file, tiếp tục controller
    }

    const uploadPromises = files.map(async (file) => {
      // Resize ảnh bằng sharp
      const resizedBuffer = await sharp(file.buffer)
        .resize({ width: 800, height: 600 }) // tuỳ chỉnh kích thước
        .toBuffer()

      // Upload lên Cloudinary
      return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'tours', resource_type: 'auto' },
          (
            err: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (err) return reject(err)
            if (!result)
              return reject(new Error('Cloudinary upload result undefined'))
            resolve(result.secure_url)
          }
        )
        streamifier.createReadStream(resizedBuffer).pipe(stream)
      })
    })

    // Chờ tất cả file upload xong
    const urls = await Promise.all(uploadPromises)

    // Nếu chỉ 1 file → req.body.image, nếu nhiều file → req.body.images
    if (urls.length === 1) {
      req.body.image = urls[0]
    } else {
      req.body.images = urls
    }

    next()
  } catch (err) {
    console.error('Upload lỗi:', err)
    return res.status(500).json({ code: 500, message: 'Upload ảnh thất bại' })
  }
}
