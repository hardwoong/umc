export const bodyToMission = (body) => ({
    storeId: body.storeId,
    reward: body.reward,
    deadline: new Date(body.deadline),
    missionSpec: body.missionSpec,
});

export const responseFromMission = (mission) => ({
    id: mission.id,
    storeId: mission.storeId,
    reward: mission.reward,
    deadline: mission.deadline,
    missionSpec: mission.missionSpec,
});