// 用户TOKEN
export function getToken() {
    return sessionStorage.getItem("user-token") || localStorage.getItem("user-token");
}

export function setToken(token, auto = false) {
    localStorage.removeItem("user-token");
    sessionStorage.removeItem("user-token");
    if (auto) {
        localStorage.setItem("user-token", token);
    } else {
        sessionStorage.setItem("user-token", token);
    }
}