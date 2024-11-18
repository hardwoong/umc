// index.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddMission, handleChallengeMission, handleListStoreMissions, handleListInProgressMissions, handleCompleteMission } from "./controllers/mission.controller.js";
import { handleAddReview, handleListUserReviews } from "./controllers/review.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

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

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(null, {
    swaggerOptions: {
      url: "/openapi.json", // Swagger 정의 경로
    },
  })
);


app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };

  const outputFile = "./openapi.json"; // 파일 저장 경로
  const routes = ["./src/index.js"]; // 경로 설정
  const doc = {
    openapi: "3.0.0", // OpenAPI 버전 명시
    info: {
      title: "UMC 7th API",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
      version: "1.0.0", // 문서 버전 필수
    },
    servers: [
      {
        url: "http://localhost:3000", // 서버 URL 명시
        description: "로컬 서버",
      },
    ],
  };
  

  try {
    const swaggerAutogenInstance = swaggerAutogen(options);
    const result = await swaggerAutogenInstance(outputFile, routes, doc);

    // Swagger 정의를 직접 반환
    res.json(result ? result.data : { error: "Swagger 정의 생성 실패" });
  } catch (error) {
    console.error("Swagger 생성 중 오류 발생:", error);
    res.status(500).json({ error: "Swagger 정의 생성 중 오류 발생" });
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
