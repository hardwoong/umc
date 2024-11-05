// src/repositories/store.repository.js
import { prisma } from "../db.config.js";

// 가게 추가
export const addStore = async (data) => {
    return await prisma.store.create({
        data: {
            name: data.name,
        },
    });
};

// 가게 존재 여부 확인
export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findUnique({
        where: { id: storeId },
    });
    return store !== null;
};
