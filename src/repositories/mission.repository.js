// mission.repository.js
import { prisma } from "../db.config.js";

export const addMission = async (data) => {
    return await prisma.mission.create({
        data: {
            storeId: data.storeId,
            reward: data.reward,
            deadline: new Date(data.deadline),
            missionSpec: data.missionSpec,
        },
    });
};

export const checkMissionExists = async (missionId) => {
    const mission = await prisma.mission.findUnique({
        where: { id: missionId },
    });
    return mission !== null;
};

export const checkMissionInProgress = async (memberId, missionId) => {
    const memberMission = await prisma.memberMission.findFirst({
        where: { memberId, missionId, status: "진행중" },
    });
    return memberMission !== null;
};

export const addMemberMissionToDB = async (memberId, missionId) => {
    return await prisma.memberMission.create({
        data: {
            memberId,
            missionId,
            status: "진행중",
        },
    });
};
