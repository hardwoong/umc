// mission.service.js
import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, checkMissionExists, checkMissionInProgress, addMemberMissionToDB } from "../repositories/mission.repository.js";

export const createMission = async (data) => {
    const mission = await addMission({
        storeId: data.storeId,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.missionSpec,
    });
    return responseFromMission(mission);
};

export const challengeMission = async (data) => {
    const missionExists = await checkMissionExists(data.missionId);
    if (!missionExists) throw new Error("미션이 존재하지 않습니다.");

    const inProgress = await checkMissionInProgress(data.memberId, data.missionId);
    if (inProgress) throw new Error("이미 도전 중인 미션입니다.");

    const newChallenge = await addMemberMissionToDB(data.memberId, data.missionId);
    return responseFromMission(newChallenge);
};
