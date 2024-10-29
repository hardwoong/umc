import { pool } from "../db.config.js";

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            `SELECT COUNT(*) AS count FROM mission WHERE id = ?;`,
            [missionId]
        );
        conn.release();

        // 미션이 존재하면 true, 존재하지 않으면 false 반환
        return rows[0].count > 0;
    } catch (err) {
        conn.release();
        throw new Error(`미션을 확인하는 중 오류가 발생했습니다. (${err.message})`);
    }
};

// 미션이 이미 도전 중인지 확인
export const checkMissionInProgress = async (memberId, missionId) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await conn.query(
            `SELECT COUNT(*) AS count FROM member_mission 
             WHERE member_id = ? AND mission_id = ? AND status = '진행중';`,
            [memberId, missionId]
        );
        conn.release();

        // 미션이 진행 중인 경우 true, 아닌 경우 false 반환
        return rows[0].count > 0;
    } catch (err) {
        conn.release();
        throw new Error(`미션 상태를 확인하는 중 오류가 발생했습니다. (${err.message})`);
    }
};

// 새로운 미션 도전을 데이터베이스에 추가
export const addMemberMissionToDB = async (data) => {
    const { memberId, missionId } = data;
    const conn = await pool.getConnection();

    try {
        const [result] = await conn.query(
            `INSERT INTO member_mission (member_id, mission_id, status, created_at, updated_at) 
            VALUES (?, ?, '진행중', NOW(), NOW());`,
            [memberId, missionId]
        );

        return result.insertId; // 새로 추가된 member_mission의 ID 반환
    } catch (err) {
        throw new Error(`미션 도전 추가 중 오류가 발생했습니다. (${err.message})`);
    } finally {
        conn.release();
    }
};
