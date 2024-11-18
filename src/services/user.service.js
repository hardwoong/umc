// user.service.js
import { responseFromUser } from "../dtos/user.dto.js";
import { DuplicateUserEmailError } from "../error.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";

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
