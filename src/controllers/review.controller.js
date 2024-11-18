import { createReview, listUserReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
  /**
    #swagger.summary = '리뷰 추가 API';
    #swagger.description = '특정 가게에 리뷰를 추가합니다.';
    #swagger.tags = ['Review']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { 
                type: "integer", 
                description: "가게 ID", 
                example: 1 
              },
              userId: { 
                type: "integer", 
                description: "사용자 ID", 
                example: 1 
              },
              content: { 
                type: "string", 
                description: "리뷰 내용", 
                example: "정말 맛있는 가게였어요!" 
              }
            },
            required: ["storeId", "userId", "content"] // 필수 값 지정
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 추가 성공",
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
                  id: { type: "integer", example: 10 },
                  storeId: { type: "integer", example: 1 },
                  userId: { type: "integer", example: 1 },
                  content: { type: "string", example: "정말 맛있는 가게였어요!" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "invalid_request" },
                  reason: { type: "string", example: "요청 본문이 올바르지 않습니다." },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "서버 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "server_error" },
                  reason: { type: "string", example: "서버에서 오류가 발생했습니다." },
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
  console.log("리뷰 추가 요청을 받았습니다!");
  console.log("body:", req.body); // 요청 본문 로깅
  
    try {
      const review = await createReview(req.body);
      console.log("리뷰 추가 성공:", review);
      res.status(201).json({ result: review });
    } catch (error) {
      console.error("리뷰 추가 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  export const handleListUserReviews = async (req, res) => {
    /**
 * @swagger
 * /api/v1/users/{userId}/reviews:
 * * #swagger.tags = ['Review'];
 *   get:
 *     summary: 특정 사용자가 작성한 리뷰 목록 조회
 *     description: 특정 사용자가 작성한 리뷰 목록을 커서 기반 페이징으로 조회합니다.
 *     tags:
 *       - Review
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: 리뷰를 조회하려는 사용자의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: cursor
 *         in: query
 *         required: false
 *         description: 페이징을 위한 커서 (마지막으로 조회된 리뷰 ID)
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: 리뷰 목록 조회 성공
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *       400:
 *         description: 잘못된 요청 (userId가 유효하지 않거나 누락된 경우)
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
 *                       example: invalid_request
 *                     reason:
 *                       type: string
 *                       example: "userId가 유효하지 않습니다."
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
    console.log("사용자의 리뷰 목록 조회 요청을 받았습니다!");
    console.log("userId:", req.params.userId, "cursor:", req.query.cursor);
  
    try {
      const reviews = await listUserReviews(parseInt(req.params.userId), parseInt(req.query.cursor));
      console.log("사용자의 리뷰 목록 조회 성공:", reviews);
      res.status(200).json({ result: reviews });
    } catch (error) {
      console.error("리뷰 목록 조회 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
