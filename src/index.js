// index.js
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview, handleListUserReviews } from "./controllers/review.controller.js";
import { handleAddMission, handleChallengeMission } from "./controllers/mission.controller.js";
import { handleListStoreMissions } from "./controllers/mission.controller.js";
import { handleListInProgressMissions } from "./controllers/mission.controller.js";
import { handleCompleteMission } from "./controllers/mission.controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleAddStore);
app.post("/api/v1/reviews", handleAddReview);
app.post("/api/v1/missions", handleAddMission);
app.post("/api/v1/missions/challenge", handleChallengeMission);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/missions/in-progress", handleListInProgressMissions);
app.patch("/api/v1/users/:userId/missions/:missionId/complete", handleCompleteMission);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
