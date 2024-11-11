import { prisma } from "../db.config.js";

export const addStore = async (data) => {
    return await prisma.store.create({
        data: {
            name: data.name,
        },
    });
};
