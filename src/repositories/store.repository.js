import { pool } from "./src/db.config.js";

// 가게를 데이터베이스에 추가
export const addStoreToDB = async (data) => {
    const { regionId, name, address, score } = data;
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            `INSERT INTO store (region_id, name, address, score, created_at, updated_at) 
            VALUES (?, ?, ?, ?, NOW(), NOW());`,
            [regionId, name, address, score]
        );

        return result.insertId; // 새로 추가된 가게의 ID 반환
    } catch (err) {
        throw new Error(`가게 추가 중 오류가 발생했습니다. (${err.message})`);
    } finally {
        conn.release();
    }
};
