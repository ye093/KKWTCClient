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

// 短信Token
export function getCaptchaToken() {
    return sessionStorage.getItem("ms-token") || '';
}

export function setCaptchaToken(token) {
    sessionStorage.setItem("ms-token", token);
}

export function removeCaptchaToken() {
    sessionStorage.removeItem("ms-token");
}

// 重置密码token
export function getResCaptchaToken() {
    return sessionStorage.getItem("ms-res-token") || '';
}

export function setResCaptchaToken(token) {
    sessionStorage.setItem("ms-res-token", token);
}

export function removeResCaptchaToken() {
    sessionStorage.removeItem("ms-res-token");
}