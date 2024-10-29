import { StatusCodes } from "http-status-codes";
import { challengeMission } from "../services/missionChallenge.service.js";

export const handleChallengeMission = async (req, res, next) => {
    try {
        console.log("미션 도전 요청을 받았습니다!");
        console.log("body:", req.body); // 테스트용 로그

        const mission = await challengeMission(req.body);
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
