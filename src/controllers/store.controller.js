import { createStore } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
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
  
