// 用户TOKEN
export function getToken() {
    return sessionStorage.getItem("user-token") || localStorage.getItem("user-token");
}

export function setToken(token, auto = false) {
    localStorage.clear();
    sessionStorage.clear();
    if (auto) {
        localStorage.setItem("user-token", token);
    } else {
        sessionStorage.setItem("user-token", token);
    }
}