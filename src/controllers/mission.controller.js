import { StatusCodes } from "http-status-codes";
import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
    try {
        console.log("미션 추가 요청을 받았습니다!");
        console.log("body:", req.body); // 테스트용 로그

        const mission = await addMission(req.body);
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
