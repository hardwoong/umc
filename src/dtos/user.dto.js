export const bodyToUser = (body) => ({
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth: new Date(body.birth),
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
});

export const responseFromUser = ({ user, preferences }) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: {
        fullAddress: user.address,
        detailAddress: user.detailAddress,
    },
    phoneNumber: user.phoneNumber,
    preferences: preferences.map((pref) => ({
        id: pref.id,
        name: pref.foodCategory.name,
    })),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
});
