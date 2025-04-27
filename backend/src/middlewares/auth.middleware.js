import jwt from 'jsonwebtoken';
import { db } from '../libs/db.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies['x-auth-token'];

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized user'
            })
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        if (!id) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized user'
            })
        }

        const user = await db.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                imageUrl: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Unauthorized user'
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error)
    }
}