import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        return cb(null,'public/chat')
    },
    filename:(req,file,cb) => {
        cb(null,Date.now() + file.originalname)
    }
})

const limits = {
    fileSize:50*1024*1024
}

export const uploadChat = multer({
    storage:storage,
    limits:limits
})