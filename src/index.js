// index.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddMission, handleChallengeMission, handleListStoreMissions, handleListInProgressMissions, handleCompleteMission } from "./controllers/mission.controller.js";
import { handleAddReview, handleListUserReviews } from "./controllers/review.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/**
 * 공통 응답 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

/**
 * User 관련 라우트
 */
app.post("/api/v1/users/signup", handleUserSignUp);

/**
 * Mission 관련 라우트
 */
app.post("/api/v1/missions", handleAddMission);
app.post("/api/v1/missions/challenge", handleChallengeMission);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/missions/in-progress", handleListInProgressMissions);
app.patch("/api/v1/users/:userId/missions/:missionId/complete", handleCompleteMission);

/**
 * Review 관련 라우트
 */
app.post("/api/v1/reviews", handleAddReview);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);

/**
 * Store 관련 라우트
 */
app.post("/api/v1/stores", handleAddStore);

/**
 * 전역 오류 처리 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    resultType: "FAIL",
    error: {
      errorCode: err.errorCode || "unknown",
      reason: err.reason || err.message || null,
      data: err.data || null,
    },
    success: null,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
