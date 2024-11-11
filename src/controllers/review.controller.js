import { createReview, listUserReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
    console.log("리뷰 추가 요청을 받았습니다!");
    console.log("body:", req.body);
  
    try {
      const review = await createReview(req.body);
      console.log("리뷰 추가 성공:", review);
      res.status(201).json({ result: review });
    } catch (error) {
      console.error("리뷰 추가 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  export const handleListUserReviews = async (req, res) => {
    console.log("사용자의 리뷰 목록 조회 요청을 받았습니다!");
    console.log("userId:", req.params.userId, "cursor:", req.query.cursor);
  
    try {
      const reviews = await listUserReviews(parseInt(req.params.userId), parseInt(req.query.cursor));
      console.log("사용자의 리뷰 목록 조회 성공:", reviews);
      res.status(200).json({ result: reviews });
    } catch (error) {
      console.error("리뷰 목록 조회 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
