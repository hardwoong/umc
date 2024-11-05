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

export const handleListStoreMissions = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId);
        const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

        const missions = await listStoreMissions(storeId, cursor);

        res.status(StatusCodes.OK).json({ result: missions });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const handleListInProgressMissions = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

        const missions = await listInProgressMissions(userId, cursor);

        res.status(StatusCodes.OK).json({ result: missions });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};