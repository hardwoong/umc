import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddStore } from "./controllers/store.controller.js";
import { handleAddReview } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission } from "./controllers/missionChallenge.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/stores", handleAddStore);
app.post("/api/v1/reviews", handleAddReview);
app.post("/api/v1/missions", handleAddMission);
app.post("/api/v1/missions/challenge", handleChallengeMission);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
