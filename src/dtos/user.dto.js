export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
    
    return {
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferences,
    };
};

export const responseFromUser = ({ user, preferences }) => {
    return {
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
        preferences: preferences.map(pref => ({
            id: pref.id,
            type: pref.type, // 선호도의 타입 혹은 카테고리
            value: pref.value, // 선호도의 값
        })),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
