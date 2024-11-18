export const bodyToStore = (body) => ({
    name: body.name,
});

export const responseFromStore = (store) => ({
    id: store.id,
    name: store.name,
});
