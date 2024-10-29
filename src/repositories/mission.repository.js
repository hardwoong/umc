import { pool } from "../db.config.js";

// 가게 존재 여부 확인
export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            `SELECT COUNT(*) AS count FROM store WHERE id = ?;`,
            [storeId]
        );
        conn.release();

        // 가게가 존재하면 true, 존재하지 않으면 false 반환
        return rows[0].count > 0;
    } catch (err) {
        conn.release();
        throw new Error(`가게를 확인하는 중 오류가 발생했습니다. (${err.message})`);
    }
};

// 미션을 데이터베이스에 추가
export const addMissionToDB = async (data) => {
    const { storeId, reward, deadline, missionSpec } = data;
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            `INSERT INTO mission (store_id, reward, deadline, mission_spec, created_at, updated_at) 
            VALUES (?, ?, ?, ?, NOW(), NOW());`,
            [storeId, reward, deadline, missionSpec]
        );

        return result.insertId; // 새로 추가된 미션의 ID 반환
    } catch (err) {
        throw new Error(`미션 추가 중 오류가 발생했습니다. (${err.message})`);
    } finally {
        conn.release();
    }
};
