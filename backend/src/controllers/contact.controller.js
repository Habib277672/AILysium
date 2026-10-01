import { prisma } from "../lib/prisma.js";
import { contactMessageSchema } from "../validators/contact.validator.js";

// POST /api/contact — public, no auth required
export const submitContactMessage = async (req, res, next) => {
    try {
        const { data, error } = contactMessageSchema.safeParse(req.body);
        if (error) {
            const err = new Error(error.issues[0].message);
            err.status = 400;
            throw err;
        }

        const message = await prisma.contactMessage.create({ data });

        res.status(201).json({ message: "Message received." });
    } catch (err) {
        next(err);
    }
};

// GET /api/admin/contact-messages — list, newest first
const PAGE_SIZE = 20;

export const getContactMessages = async (req, res, next) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const search = (req.query.search || "").trim();

        const where = search
            ? {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { program: { contains: search, mode: "insensitive" } },
                ],
            }
            : {};

        const [messages, total] = await Promise.all([
            prisma.contactMessage.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * PAGE_SIZE,
                take: PAGE_SIZE,
            }),
            prisma.contactMessage.count({ where }),
        ]);

        res.json({
            data: messages,
            total,
            page,
            totalPages: Math.ceil(total / PAGE_SIZE) || 1,
        });
    } catch (err) {
        next(err);
    }
};

// GET /api/admin/contact-messages/:id — single message detail
export const getContactMessageById = async (req, res, next) => {
    try {
        const message = await prisma.contactMessage.findUnique({
            where: { id: req.params.id },
        });

        if (!message) {
            const err = new Error("Message not found");
            err.status = 404;
            throw err;
        }

        res.json(message);
    } catch (err) {
        next(err);
    }
};