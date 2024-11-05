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

export const listStoreMissionsFromDB = async (storeId, cursor) => {
    const take = 10; // 한 번에 가져올 미션 개수

    return await prisma.mission.findMany({
        where: { storeId },
        take,
        skip: cursor ? 1 : 0, // 커서가 있으면 현재 커서 이후의 데이터를 가져옴
        ...(cursor && { cursor: { id: cursor } }), // 커서를 기준으로 페이징
        orderBy: { id: "asc" },
    });
};
