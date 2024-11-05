// src/repositories/mission.repository.js
import { prisma } from "../db.config.js";

// 미션 추가
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

// 특정 미션 확인
export const checkMissionExists = async (missionId) => {
    const mission = await prisma.mission.findUnique({
        where: { id: missionId },
    });
    return mission !== null;
};

// 미션 도전 확인
export const checkMissionInProgress = async (memberId, missionId) => {
    const memberMission = await prisma.memberMission.findFirst({
        where: { memberId, missionId, status: "진행중" },
    });
    return memberMission !== null;
};

// 미션 도전 추가
export const addMemberMissionToDB = async (data) => {
    return await prisma.memberMission.create({
        data: {
            memberId: data.memberId,
            missionId: data.missionId,
            status: "진행중",
        },
    });
};
