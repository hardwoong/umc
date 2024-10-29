import { addMemberMissionToDB, checkMissionExists, checkMissionInProgress } from "../repositories/missionChallenge.repository.js";

export const challengeMission = async (data) => {
    const { memberId, missionId } = data;

    if (!memberId || !missionId) {
        throw new Error("필수 필드가 누락되었습니다.");
    }

    // 미션이 존재하는지 확인
    const missionExists = await checkMissionExists(missionId);
    if (!missionExists) {
        throw new Error("도전하려는 미션이 존재하지 않습니다.");
    }

    // 미션이 이미 도전 중인지 확인
    const isInProgress = await checkMissionInProgress(memberId, missionId);
    if (isInProgress) {
        throw new Error("이미 이 미션에 도전 중입니다.");
    }

    // 새로운 미션 도전을 데이터베이스에 추가
    const memberMissionId = await addMemberMissionToDB({
        memberId,
        missionId,
    });

    return {
        id: memberMissionId,
        memberId,
        missionId,
        status: "진행중",
    };
};
