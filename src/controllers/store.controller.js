import { StatusCodes } from "http-status-codes";
import { createStore } from "../services/store.service.js";

export const handleAddStore = async (req, res) => {
    try {
        const store = await createStore(req.body);
        res.status(StatusCodes.CREATED).json({ result: store });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
