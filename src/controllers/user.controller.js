// user.controller.js
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { StatusCodes } from "http-status-codes";
import { updateUser } from "../services/user.service.js";

export const handleUserSignUp = async (req, res) => {
/**
 * @swagger
 * /api/v1/users/{userId}:
 *   patch:
 *     summary: 사용자 정보 수정
 *     description: 사용자가 본인의 정보를 수정합니다.
 *     tags:
 *       - User
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: 수정하려는 사용자의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: 사용자 전화번호
 *                 example: "010-1234-5678"
 *               birth:
 *                 type: string
 *                 format: date
 *                 description: 사용자 생년월일
 *                 example: "1990-01-01"
 *               address:
 *                 type: string
 *                 description: 사용자 주소
 *                 example: "서울특별시 강남구"
 *               detailAddress:
 *                 type: string
 *                 description: 상세 주소
 *                 example: "101호"
 *     responses:
 *       200:
 *         description: 사용자 정보 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: SUCCESS
 *                 error:
 *                   type: null
 *                 success:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "test@example.com"
 *                     phoneNumber:
 *                       type: string
 *                       example: "010-1234-5678"
 *                     birth:
 *                       type: string
 *                       format: date
 *                       example: "1990-01-01"
 *                     address:
 *                       type: string
 *                       example: "서울특별시 강남구"
 *                     detailAddress:
 *                       type: string
 *                       example: "101호"
 *       404:
 *         description: 사용자 정보를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: U002
 *                     reason:
 *                       type: string
 *                       example: "사용자를 찾을 수 없습니다."
 *                     data:
 *                       type: null
 *                 success:
 *                   type: null
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resultType:
 *                   type: string
 *                   example: FAIL
 *                 error:
 *                   type: object
 *                   properties:
 *                     errorCode:
 *                       type: string
 *                       example: server_error
 *                     reason:
 *                       type: string
 *                       example: "서버에서 오류가 발생했습니다."
 *                     data:
 *                       type: null
 *                 success:
 *                   type: null
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

export const handleUpdateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const updatedData = req.body;

    const updatedUser = await updateUser(userId, updatedData);

    if (!updatedUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        resultType: "FAIL",
        error: { errorCode: "U002", reason: "사용자를 찾을 수 없습니다.", data: null },
        success: null,
      });
    }

    res.status(StatusCodes.OK).json({
      resultType: "SUCCESS",
      error: null,
      success: updatedUser,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      resultType: "FAIL",
      error: { errorCode: "server_error", reason: error.message, data: null },
      success: null,
    });
  }
};