// user.repository.js
import { prisma } from "../db.config.js";

// 사용자 추가
export const addUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) return null;

  return await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
    },
  });
};

// 사용자 정보 조회
export const getUser = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

// 선호 카테고리 설정
export const setPreference = async (userId, foodCategoryId) => {
  return await prisma.userFavorCategory.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 목록 조회
export const getUserPreferencesByUserId = async (userId) => {
  return await prisma.userFavorCategory.findMany({
    where: { userId },
    include: { foodCategory: true },
  });
};
