import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import { googleStrategy, naverStrategy } from "./auth.config.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./db.config.js"; // Prisma 클라이언트 import
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleUpdateUser } from "./controllers/user.controller.js";

dotenv.config();

const app = express(); // 여기에서 한 번만 초기화
const port = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션 미들웨어 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Passport 초기화 및 세션 설정
passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("Hello World!");
});

// Swagger 설정
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(null, {
    swaggerOptions: {
      url: "/openapi.json", // Swagger 정의 경로
    },
  })
);

app.get("/openapi.json", async (req, res) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };

  const outputFile = "./openapi.json"; // 파일 저장 경로
  const routes = ["./src/index.js"];
  const doc = {
    openapi: "3.0.0",
    info: {
      title: "UMC 7th API",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "로컬 서버",
      },
    ],
  };

  try {
    const swaggerAutogenInstance = swaggerAutogen(options);
    const result = await swaggerAutogenInstance(outputFile, routes, doc);
    res.json(result ? result.data : { error: "Swagger 정의 생성 실패" });
  } catch (error) {
    console.error("Swagger 생성 중 오류 발생:", error);
    res.status(500).json({ error: "Swagger 정의 생성 중 오류 발생" });
  }
});

// GOOGLE OAuth2 라우트
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// Naver OAuth
app.get("/oauth2/login/naver", passport.authenticate("naver"));
app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.patch("/api/v1/users/:userId", handleUpdateUser);


// 서버 시작
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
