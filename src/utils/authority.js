// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('wtc-pro-authority') || sessionStorage.getItem('wtc-pro-authority');
}

export function setAuthority(authority, auto) {
  localStorage.removeItem("wtc-pro-authority");
  sessionStorage.removeItem("wtc-pro-authority");
  let storage = auto ? localStorage : sessionStorage;
  return storage.setItem('wtc-pro-authority', authority);
}
