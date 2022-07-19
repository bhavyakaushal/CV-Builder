export function getSessionFromStorage() {
    let storageData =
        sessionStorage.getItem("user") || localStorage.getItem("user");
    let user = storageData ? JSON.parse(storageData) : null;

    return user;
}

export function authHeader() {
    let user = getSessionFromStorage();
    if (user?.token) {
        return { authorization: "Bearer " + user.token };
    } else {
        return {};
    }
}
