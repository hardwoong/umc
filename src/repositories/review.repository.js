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

// 리뷰를 데이터베이스에 추가
export const addReviewToDB = async (data) => {
    const { storeId, memberId, body, score } = data;
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            `INSERT INTO review (member_id, store_id, body, score, created_at) 
            VALUES (?, ?, ?, ?, NOW());`,
            [memberId, storeId, body, score]
        );

        return result.insertId; // 새로 추가된 리뷰의 ID 반환
    } catch (err) {
        throw new Error(`리뷰 추가 중 오류가 발생했습니다. (${err.message})`);
    } finally {
        conn.release();
    }
};
