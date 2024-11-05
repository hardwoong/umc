// src/dtos/store.dto.js
export const bodyToStore = (body) => ({
    name: body.name,
});

export const responseFromStore = (store) => ({
    id: store.id,
    name: store.name,
});

export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};