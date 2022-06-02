import { tokenKey } from "./../config.js"
import apiFetch from "./api-fetch.js"

export async function login(credentials = { username, password }) {
    const { token, ...user } = await apiFetch("login", {body: credentials})
    sessionStorage.setItem(tokenKey, token);
    console.log(user);
    return user;
}

export async function logout() {
    const data = await apiFetch("logout", { method: "POST" });
    sessionStorage.removeItem(tokenKey);
    console.log(data);
    return data;
}