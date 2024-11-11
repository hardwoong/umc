// user.controller.js
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.success(user);
  } catch (error) {
    res.error({
      errorCode: error.errorCode || "U001",
      reason: error.reason || error.message,
      data: error.data || req.body,
    });
  }
};
