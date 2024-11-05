import { StatusCodes } from "http-status-codes";
import { createMission, challengeMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res) => {
    try {
        const mission = await createMission(req.body);
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const handleChallengeMission = async (req, res) => {
    try {
        const mission = await challengeMission(req.body);
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
