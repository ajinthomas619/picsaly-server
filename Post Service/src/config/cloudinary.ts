import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

export interface CloudinaryFile extends Express.Multer.File {
    buffer: Buffer;
}

cloudinary.config({
    cloud_name: 'dcvwwuzkt',
    api_key: '197968858617486',
    api_secret: 'JNPgBeLgKqXgJ9FyjBtz3a3P6Rs',
});

export { cloudinary };