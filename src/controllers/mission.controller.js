import { createMission, challengeMission, listStoreMissions, listInProgressMissions, completeMission } from "../services/mission.service.js";
import { StatusCodes } from "http-status-codes";

// mission.controller.js
export const handleAddMission = async (req, res) => {
    console.log("미션 추가 요청을 받았습니다!");
    console.log("body:", req.body); // 미션 추가 요청의 본문 출력
  
    try {
      const mission = await createMission(req.body);
      res.status(201).json({ result: mission });
    } catch (error) {
      console.error("미션 추가 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  export const handleChallengeMission = async (req, res) => {
    try {
        console.log("미션 도전 요청을 받았습니다!");
        console.log("body:", req.body); // 요청 본문을 출력하여 확인

        const mission = await challengeMission(req.body);
        
        console.log("미션 도전 성공:", mission); // 성공 시 로그 출력
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        console.error("미션 도전 중 오류 발생:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};


export const handleListStoreMissions = async (req, res) => {
    console.log("가게의 미션 목록 조회 요청을 받았습니다!");
    console.log("storeId:", req.params.storeId, "cursor:", req.query.cursor);
  
    try {
      const missions = await listStoreMissions(parseInt(req.params.storeId), parseInt(req.query.cursor));
      console.log("가게의 미션 목록 조회 성공:", missions);
      res.status(200).json({ result: missions });
    } catch (error) {
      console.error("가게의 미션 목록 조회 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

  export const handleListInProgressMissions = async (req, res) => {
    console.log("사용자의 진행 중인 미션 목록 조회 요청을 받았습니다!");
    console.log("userId:", req.params.userId, "cursor:", req.query.cursor);
  
    try {
      const missions = await listInProgressMissions(parseInt(req.params.userId), parseInt(req.query.cursor));
      console.log("진행 중인 미션 목록 조회 성공:", missions);
      res.status(200).json({ result: missions });
    } catch (error) {
      console.error("진행 중인 미션 목록 조회 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };

  export const handleCompleteMission = async (req, res) => {
    console.log("미션 완료 요청을 받았습니다!");
    console.log("userId:", req.params.userId, "missionId:", req.params.missionId);
  
    try {
      const result = await completeMission(parseInt(req.params.userId), parseInt(req.params.missionId));
      console.log("미션 완료 성공:", result);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error("미션 완료 중 오류 발생:", error);
      res.status(500).json({ error: error.message });
    }
  };
  
