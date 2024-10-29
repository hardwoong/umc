import { addMissionToDB, checkStoreExists } from "../repositories/mission.repository.js";

export const addMission = async (data) => {
    const { storeId, reward, deadline, missionSpec } = data;

    if (!storeId || !reward || !deadline || !missionSpec) {
        throw new Error("필수 필드가 누락되었습니다.");
    }

    // 가게가 존재하는지 확인
    const storeExists = await checkStoreExists(storeId);
    if (!storeExists) {
        throw new Error("미션을 추가하려는 가게가 존재하지 않습니다.");
    }

    // 미션을 데이터베이스에 추가
    const missionId = await addMissionToDB({
        storeId,
        reward,
        deadline,
        missionSpec,
    });

    return {
        id: missionId,
        storeId,
        reward,
        deadline,
        missionSpec,
    };
};
