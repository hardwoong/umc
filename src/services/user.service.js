// user.service.js
import { responseFromUser } from "../dtos/user.dto.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
    const userId = await addUser({
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
    });

    if (!userId) throw new Error("이미 존재하는 이메일입니다.");

    for (const preference of data.preferences) {
        await setPreference(userId, preference);
    }

    const user = await getUser(userId);
    const preferences = await getUserPreferencesByUserId(userId);

    return responseFromUser({ user, preferences });
};
