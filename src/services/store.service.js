// store.service.js
import { addStore, checkStoreExists } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const createStore = async (data) => {
    const store = await addStore({
        name: data.name,
    });
    return responseFromStore(store);
};

export const isStoreExists = async (storeId) => {
    return await checkStoreExists(storeId);
};
