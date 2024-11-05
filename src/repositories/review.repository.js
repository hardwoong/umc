import { prisma } from "../db.config.js";

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

export const listUserReviewsFromDB = async (userId, cursor) => {
    const take = 10; // 한 번에 가져올 리뷰 개수

    return await prisma.userStoreReview.findMany({
        where: { userId },
        take,
        skip: cursor ? 1 : 0, // 커서가 있으면 현재 커서 이후의 데이터를 가져옵니다
        ...(cursor && { cursor: { id: cursor } }), // 커서를 기준으로 페이징
        orderBy: { id: "asc" },
    });
};