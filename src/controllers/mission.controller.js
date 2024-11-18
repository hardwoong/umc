import { createMission, challengeMission, listStoreMissions, listInProgressMissions, completeMission } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

// mission.controller.js
export const handleAddMission = async (req, res) => {
    /**
 * #swagger.summary = '미션 추가 API';
 * * #swagger.tags = ['Mission'];
 * #swagger.description = '새로운 미션을 추가합니다.';
 * #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "integer", description: "미션이 속하는 가게 ID", example: 1 },
              reward: { type: "integer", description: "미션 완료 시 제공되는 포인트", example: 500 },
              deadline: { type: "string", format: "date-time", description: "미션 종료 기한 (ISO 8601 형식)", example: "2024-12-31T23:59:59" },
              missionSpec: { type: "string", description: "미션 세부 설명", example: "10만원 이상 구매 시 적립" }
            },
            required: ["storeId", "reward", "deadline", "missionSpec"]
          }
        }
      }
    };
 * #swagger.responses[201] = {
      description: "미션 추가 성공 응답",
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
                  id: { type: "integer", example: 1 },
                  storeId: { type: "integer", example: 1 },
                  reward: { type: "integer", example: 500 },
                  deadline: { type: "string", format: "date-time", example: "2024-12-31T23:59:59" },
                  missionSpec: { type: "string", example: "10만원 이상 구매 시 적립" }
                }
              }
            }
          }
        }
      }
    };
 * #swagger.responses[400] = {
      description: "미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string", example: "잘못된 요청 데이터" },
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
    console.log("미션 추가 요청을 받았습니다!");
    console.log("body:", req.body); // 미션 추가 요청의 본문 출력
  
    try {
      const mission = await createMission(req.body);
      res.status(201).json({ result: mission });
    } catch (error) {
      console.error("미션 추가 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  export const handleChallengeMission = async (req, res) => {
/**
 * #swagger.summary = '미션 도전 API';
 * #swagger.description = '사용자가 특정 미션에 도전합니다.';
 * #swagger.tags = ['Mission'];
 * #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { 
                type: "integer", 
                description: "사용자 ID", 
                example: 1 
              },
              missionId: { 
                type: "integer", 
                description: "미션 ID", 
                example: 2 
              }
            },
            required: ["userId", "missionId"]
          }
        }
      }
    };
 * #swagger.responses[201] = {
      description: "미션 도전 성공",
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
                  id: { type: "integer", example: 1 },
                  storeId: { type: "integer", example: 1 },
                  reward: { type: "integer", example: 500 },
                  deadline: { type: "string", format: "date-time", example: "2024-12-31T23:59:59" },
                  missionSpec: { type: "string", example: "10만원 이상 구매 시 적립" }
                }
              }
            }
          }
        }
      }
    };
 * #swagger.responses[400] = {
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
                  errorCode: { type: "string", example: "M002" },
                  reason: { type: "string", example: "잘못된 요청 데이터" },
                  data: { type: "object", nullable: true }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
 * #swagger.responses[500] = {
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
                  errorCode: { type: "string", example: "E001" },
                  reason: { type: "string", example: "서버 내부 오류" },
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
    try {
        console.log("미션 도전 요청을 받았습니다!");
        console.log("body:", req.body); // 요청 본문을 출력하여 확인

        const mission = await challengeMission(req.body);
        
        console.log("미션 도전 성공:", mission); // 성공 시 로그 출력
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        console.error("미션 도전 중 오류 발생:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


export const handleListStoreMissions = async (req, res) => {
  /**
 * @swagger
 * /api/v1/stores/{storeId}/missions:
 * * #swagger.tags = ['Mission'];
 *   get:
 *     summary: 특정 가게의 미션 목록 조회
 *     description: 특정 가게에 대한 미션 목록을 조회합니다.
 *     tags:
 *       - Mission
 *     parameters:
 *       - name: storeId
 *         in: path
 *         required: true
 *         description: 조회할 가게의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: cursor
 *         in: query
 *         required: false
 *         description: 페이징을 위한 커서 (마지막으로 조회된 미션 ID)
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: 미션 목록 조회 성공
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
 *                     $ref: '#/components/schemas/Mission'
 *       400:
 *         description: 잘못된 요청 (storeId가 유효하지 않거나 누락된 경우)
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
 *                       example: storeId가 유효하지 않습니다.
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
 *                       example: 서버에서 오류가 발생했습니다.
 *                     data:
 *                       type: null
 *                 success:
 *                   type: null
 */
    console.log("가게의 미션 목록 조회 요청을 받았습니다!");
    console.log("storeId:", req.params.storeId, "cursor:", req.query.cursor);
  
    try {
      const missions = await listStoreMissions(parseInt(req.params.storeId), parseInt(req.query.cursor));
      console.log("가게의 미션 목록 조회 성공:", missions);
      res.status(200).json({ result: missions });
    } catch (error) {
      console.error("가게의 미션 목록 조회 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  export const handleListInProgressMissions = async (req, res) => {
    /**
 * @swagger
 * /api/v1/users/{userId}/missions/in-progress:
 * * #swagger.tags = ['Mission'];
 *   get:
 *     summary: 진행 중인 미션 목록 조회
 *     description: 특정 사용자가 진행 중인 미션 목록을 커서 기반 페이징으로 조회합니다.
 *     tags:
 *       - Mission
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: 조회할 사용자의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: cursor
 *         in: query
 *         required: false
 *         description: 페이징을 위한 커서 (마지막으로 조회된 미션 ID)
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: 진행 중인 미션 목록 조회 성공
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
 *                     $ref: '#/components/schemas/Mission'
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
 *                       example: userId가 유효하지 않습니다.
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
 *                       example: 서버에서 오류가 발생했습니다.
 *                     data:
 *                       type: null
 *                 success:
 *                   type: null
 */
    console.log("사용자의 진행 중인 미션 목록 조회 요청을 받았습니다!");
    console.log("userId:", req.params.userId, "cursor:", req.query.cursor);
  
    try {
      const missions = await listInProgressMissions(parseInt(req.params.userId), parseInt(req.query.cursor));
      console.log("진행 중인 미션 목록 조회 성공:", missions);
      res.status(200).json({ result: missions });
    } catch (error) {
      console.error("진행 중인 미션 목록 조회 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };

  export const handleCompleteMission = async (req, res) => {
  /**
 * @swagger
 * /api/v1/users/{userId}/missions/{missionId}/complete:
 * * #swagger.tags = ['Mission'];
 *   patch:
 *     summary: 진행 중인 미션 완료 처리
 *     description: 사용자가 진행 중인 미션을 완료 상태로 변경합니다.
 *     tags:
 *       - Mission
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: 미션을 완료하려는 사용자의 ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: missionId
 *         in: path
 *         required: true
 *         description: 완료하려는 미션의 ID
 *         schema:
 *           type: integer
 *           example: 7
 *     requestBody:
 *       required: false
 *       content: 
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: {}
 *     responses:
 *       200:
 *         description: 미션 완료 성공
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
 *                   type: string
 *                   example: "미션이 완료 상태로 변경되었습니다."
 *       400:
 *         description: 잘못된 요청 (userId 또는 missionId가 유효하지 않거나 누락된 경우)
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
 *                       example: "userId 또는 missionId가 유효하지 않습니다."
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
    console.log("미션 완료 요청을 받았습니다!");
    console.log("userId:", req.params.userId, "missionId:", req.params.missionId);
  
    try {
      const result = await completeMission(parseInt(req.params.userId), parseInt(req.params.missionId));
      console.log("미션 완료 성공:", result);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error("미션 완료 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
