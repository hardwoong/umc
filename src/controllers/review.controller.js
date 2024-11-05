import { StatusCodes } from "http-status-codes";
import { createReview, listUserReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
    try {
        const review = await createReview(req.body);
        res.status(StatusCodes.CREATED).json({ result: review });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const handleListUserReviews = async (req, res) => {
    const userId = parseInt(req.params.userId);
    const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;
    try {
        const reviews = await listUserReviews(userId, cursor);
        res.status(StatusCodes.OK).json({ result: reviews });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
