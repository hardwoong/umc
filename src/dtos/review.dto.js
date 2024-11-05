// src/dtos/review.dto.js

export const bodyToReview = (body) => ({
    storeId: body.storeId,
    userId: body.userId,
    content: body.content,
});

export const responseFromReview = (review) => ({
    id: review.id,
    storeId: review.storeId,
    userId: review.userId,
    content: review.content,
});
