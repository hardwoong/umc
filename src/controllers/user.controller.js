// user.controller.js
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res) => {
/**
    #swagger.summary = '회원 가입 API';
    #swagger.description = '새로운 사용자를 등록합니다.';
    #swagger.tags = ['User']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", description: "사용자 이메일", example: "test12@example.com" },
              name: { type: "string", description: "사용자 이름", example: "홍길동" },
              gender: { type: "string", description: "사용자 성별", example: "남성" },
              birth: { type: "string", format: "date", description: "사용자 생년월일", example: "1990-01-01" },
              address: { type: "string", description: "주소", example: "서울특별시 강남구" },
              detailAddress: { type: "string", description: "상세 주소", example: "101호" },
              phoneNumber: { type: "string", description: "전화번호", example: "010-1234-5678" },
              preferences: { type: "array", items: { type: "number" }, description: "선호 카테고리 ID 배열", example: [1, 2] }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string", example: "test@example.com" },
                  name: { type: "string", example: "홍길동" },
                  preferCategory: { type: "array", items: { type: "string" }, example: ["한식", "중식"] }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "이미 존재하는 이메일입니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
*/
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
