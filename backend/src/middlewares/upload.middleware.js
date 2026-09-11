import multer from "multer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Memory storage — the file buffer is streamed straight to Cloudinary
// (see admin.upload.controller.js) and never touches disk. Simpler and
// safer than writing temp files to the server's filesystem, and works
// identically whether this ever gets deployed somewhere with an
// ephemeral/read-only filesystem.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return cb(new Error("Only JPEG, PNG, or WEBP images are allowed"));
    }
    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
});