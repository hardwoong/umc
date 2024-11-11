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

export const checkMissionInProgress = async (userId, missionId) => { // userId로 수정
    const memberMission = await prisma.memberMission.findFirst({
      where: { userId, missionId, status: "진행중" }, // userId로 수정
    });
    return memberMission !== null;
  };

  export const addMemberMissionToDB = async (userId, missionId) => { // userId로 변경
    return await prisma.memberMission.create({
      data: {
        userId, // userId로 설정
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

export const listInProgressMissionsFromDB = async (userId, cursor) => {
    const take = 10; // 한 번에 가져올 미션 개수

    return await prisma.memberMission.findMany({
        where: {
            memberId: userId,
            status: "진행중"
        },
        take,
        skip: cursor ? 1 : 0, // 커서가 있으면 현재 커서 이후의 데이터를 가져옵니다
        ...(cursor && { cursor: { id: cursor } }), // 커서를 기준으로 페이징
        orderBy: { id: "asc" },
        include: { mission: true } // 미션 상세 정보도 포함
    });
};

export const updateMissionStatus = async (userId, missionId, status) => { // userId로 수정
    const result = await prisma.memberMission.updateMany({
      where: {
        userId,          // userId로 수정
        missionId,
        status: "진행중", // 현재 상태가 "진행중"인 미션만 업데이트
      },
      data: {
        status: status
      }
    });
  
    // 업데이트된 행이 있으면 true 반환, 없으면 false 반환
    return result.count > 0;
  };