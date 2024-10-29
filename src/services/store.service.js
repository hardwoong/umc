import { addStoreToDB } from "./store.repository.js";

export const addStore = async (data) => {
    const { regionId, name, address, score } = data;

    if (!regionId || !name || !address || score === undefined) {
        throw new Error("필수 필드가 누락되었습니다.");
    }

    const storeId = await addStoreToDB({
        regionId,
        name,
        address,
        score,
    });

    return {
        id: storeId,
        regionId,
        name,
        address,
        score,
    };
};
