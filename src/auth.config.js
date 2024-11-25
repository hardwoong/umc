import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
import { prisma } from "./db.config.js";

dotenv.config();

// Google OAuth Strategy
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

// Naver OAuth Strategy
export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
  },
  (accessToken, refreshToken, profile, cb) => {
    return naverVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

// Google user verification
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  // Check if the user already exists
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  // Create a new user if not found
  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName || "추후 수정",
      gender: "미지정", // 기본값으로 '미지정'
      birth: new Date(1970, 0, 1), // 기본값
      address: "주소 미지정", // 기본값
      detailAddress: "상세 주소 미지정", // 기본값
      phoneNumber: "010-0000-0000", // 기본값
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// Naver user verification
const naverVerify = async (profile) => {
  const email = profile.emails?.[0]?.value || `${profile.id}@naver.com`; // Naver doesn't always provide email
  const name = profile.displayName || "추후 수정";

  // Check if the user already exists
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  // Create a new user if not found
  const created = await prisma.user.create({
    data: {
      email,
      name,
      gender: "미지정", // 기본값으로 '미지정'
      birth: new Date(1970, 0, 1), // 기본값
      address: "주소 미지정", // 기본값
      detailAddress: "상세 주소 미지정", // 기본값
      phoneNumber: "010-0000-0000", // 기본값
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};
