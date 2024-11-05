// src/repositories/review.repository.js
import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
    return await prisma.userStoreReview.create({
        data: {
            storeId: data.storeId,
            userId: data.userId,
            content: data.content,
        },
    });
};

// 가게의 리뷰 목록 조회 (페이징)
export const listStoreReviews = async (storeId, cursor) => {
    return await prisma.userStoreReview.findMany({
        where: { storeId },
        skip: cursor,
        take: 10,
        orderBy: { id: "asc" },
    });
};
