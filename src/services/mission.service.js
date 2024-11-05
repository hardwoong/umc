// mission.service.js
import { responseFromMission } from "../dtos/mission.dto.js";
import { addMission, checkMissionExists, checkMissionInProgress, addMemberMissionToDB } from "../repositories/mission.repository.js";
import { listStoreMissionsFromDB } from "../repositories/mission.repository.js";
import { listInProgressMissionsFromDB } from "../repositories/mission.repository.js";
import { updateMissionStatus } from "../repositories/mission.repository.js";

export const listInProgressMissions = async (userId, cursor) => {
    const missions = await listInProgressMissionsFromDB(userId, cursor);
    return missions.map(responseFromMission);
};

export const listStoreMissions = async (storeId, cursor) => {
    const missions = await listStoreMissionsFromDB(storeId, cursor);
    return missions.map(responseFromMission);
};

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

export const completeMission = async (userId, missionId) => {
    const isUpdated = await updateMissionStatus(userId, missionId, "진행 완료");
    if (!isUpdated) {
        throw new Error("진행 중인 미션이 아니거나, 미션을 완료할 수 없습니다.");
    }
    return "미션이 완료 상태로 변경되었습니다.";
};