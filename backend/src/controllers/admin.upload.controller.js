import streamifier from "streamifier";
import { cloudinary } from "../lib/cloudinary.js";

// POST /api/admin/uploads/course-image
export const uploadCourseImage = async (req, res, next) => {
    try {
        if (!req.file) {
            const err = new Error("No file was uploaded");
            err.status = 400;
            throw err;
        }

        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "ailysium/courses",
                    resource_type: "image",
                },
                (error, uploadResult) => {
                    if (error) return reject(error);
                    resolve(uploadResult);
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        res.status(201).json({ url: result.secure_url });
    } catch (err) {
        next(err);
    }
};