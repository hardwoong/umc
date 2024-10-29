import { StatusCodes } from "http-status-codes";
import { addReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    try {
        console.log("리뷰 추가 요청을 받았습니다!");
        console.log("body:", req.body); // 테스트용 로그

        const review = await addReview(req.body);
        res.status(StatusCodes.CREATED).json({ result: review });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
