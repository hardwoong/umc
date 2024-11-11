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

export const listUserReviewsFromDB = async (userId, cursor) => {
    const take = 10; // 한 번에 가져올 리뷰 개수
  
    return await prisma.userStoreReview.findMany({
      where: { userId },
      take,
      skip: cursor ? 1 : 0, // 커서가 있는 경우, 다음 데이터부터 가져옵니다
      ...(cursor && { cursor: { id: cursor } }), // 커서를 기준으로 페이징
      orderBy: { id: "asc" },
    });
  };
