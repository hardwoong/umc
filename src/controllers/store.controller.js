import { StatusCodes } from "http-status-codes";
import { addStore } from "../services/store.service.js";

export const handleAddStore = async (req, res, next) => {
    try {
        console.log("가게 추가 요청을 받았습니다!");
        console.log("body:", req.body); // 테스트용 로그

        const store = await addStore(req.body);
        res.status(StatusCodes.CREATED).json({ result: store });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
