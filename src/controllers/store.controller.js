import { createStore } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
  /**
    #swagger.summary = '가게 추가 API';
    #swagger.description = '새로운 가게를 추가합니다.';
    #swagger.tags = ['Store']
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "추가하려는 가게의 이름",
                example: "맛있는 음식점"
              }
            },
            required: ["name"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "SUCCESS" 
              },
              error: { 
                type: "null", 
                example: null 
              },
              success: {
                type: "object",
                properties: {
                  id: { 
                    type: "integer", 
                    example: 1 
                  },
                  name: { 
                    type: "string", 
                    example: "맛있는 음식점" 
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "잘못된 요청 (요청 본문이 유효하지 않은 경우)",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "FAIL" 
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string", 
                    example: "invalid_request" 
                  },
                  reason: { 
                    type: "string", 
                    example: "요청 데이터가 유효하지 않습니다." 
                  },
                  data: { 
                    type: "null", 
                    example: null 
                  }
                }
              },
              success: { 
                type: "null", 
                example: null 
              }
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
              resultType: { 
                type: "string", 
                example: "FAIL" 
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string", 
                    example: "server_error" 
                  },
                  reason: { 
                    type: "string", 
                    example: "서버에서 오류가 발생했습니다." 
                  },
                  data: { 
                    type: "null", 
                    example: null 
                  }
                }
              },
              success: { 
                type: "null", 
                example: null 
              }
            }
          }
        }
      }
    };
*/
    console.log("가게 추가 요청을 받았습니다!");
    console.log("body:", req.body);
  
    try {
      const store = await createStore(req.body);
      console.log("가게 추가 성공:", store);
      res.status(201).json({ result: store });
    } catch (error) {
      console.error("가게 추가 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
