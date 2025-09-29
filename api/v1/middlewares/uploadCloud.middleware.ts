import multer from 'multer'
import cloudinary from 'cloudinary'
import streamifier from 'streamifier'
import { Request, Response, NextFunction } from 'express'

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

// Multer memoryStorage (không lưu ổ cứng, giữ file trong RAM để đẩy thẳng lên Cloudinary)
const storage = multer.memoryStorage()
export const upload = multer({ storage })

// Middleware upload nhiều file lên Cloudinary
export const uploadToCloudinary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !(req.files instanceof Array)) {
    next()
    return
  }

  try {
    const urls: string[] = []

    for (const file of req.files as Express.Multer.File[]) {
      const result = await new Promise<cloudinary.UploadApiResponse>(
        (resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream(
            { folder: 'tours' }, // 👈 tuỳ chọn folder trong Cloudinary
            (error, result) => {
              if (result) resolve(result)
              else reject(error)
            }
          )
          streamifier.createReadStream(file.buffer).pipe(stream)
        }
      )

      urls.push(result.secure_url)
    }

    // Gắn URL Cloudinary vào body để controller save vào DB
    req.body.images = urls
    next()
  } catch (err) {
    console.error('Upload lỗi:', err)
    res.status(500).json({ code: 500, message: 'Upload ảnh thất bại' })
  }
}
