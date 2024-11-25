import { addReview, listUserReviewsFromDB } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const createReview = async (data) => {
    const review = await addReview(data);
    return responseFromReview(review);
};

export const listUserReviews = async (userId, cursor) => {
    const reviews = await listUserReviewsFromDB(userId, cursor);
    return reviews.map(responseFromReview);
};
