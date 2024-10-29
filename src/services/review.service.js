import { addReviewToDB, checkStoreExists } from "../repositories/review.repository.js";

export const addReview = async (data) => {
    const { storeId, memberId, body, score } = data;

    if (!storeId || !memberId || !body || score === undefined) {
        throw new Error("필수 필드가 누락되었습니다.");
    }

    // 가게가 존재하는지 확인
    const storeExists = await checkStoreExists(storeId);
    if (!storeExists) {
        throw new Error("리뷰를 추가하려는 가게가 존재하지 않습니다.");
    }

    // 리뷰를 데이터베이스에 추가
    const reviewId = await addReviewToDB({
        storeId,
        memberId,
        body,
        score,
    });

    return {
        id: reviewId,
        storeId,
        memberId,
        body,
        score,
    };
};
