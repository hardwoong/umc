// user.service.js
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../error.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";
import { prisma } from "../db.config.js";

export const userSignUp = async (data) => {
  const user = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (!user) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  if (data.preferences) {
    for (const preference of data.preferences) {
      await setPreference(user.id, preference);
    }
  }

  const preferences = await getUserPreferencesByUserId(user.id);
  return responseFromUser({ user, preferences });
};

export const updateUser = async (userId, data) => {
  // 허용된 수정 필드만 추출
  const { phoneNumber, birth, address, detailAddress } = data;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(phoneNumber && { phoneNumber }),
        ...(birth && { birth: new Date(birth) }),
        ...(address && { address }),
        ...(detailAddress && { detailAddress }),
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("사용자 정보 수정 중 오류:", error);
    return null;
  }
};