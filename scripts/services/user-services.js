import { tokenKey } from "./../config.js";
import apiFetch from "./api-fetch.js";

export async function signup(newUser = {
    username,
    email,
    first_name,
    last_name,
    password
}) {

    const { token, ...user } = await apiFetch("users", { body: newUser });
    sessionStorage.setItem(tokenKey, token);
    
    return user
}

export async function updateProfile(id, payload = {
    username,
    email,
    first_name,
    last_name
}) {
    const { token, ...user } = await apiFetch(`users/${id}`, { method: "PATCH", body: payload });

    return user;
}

export async function getUser(id) {
    const { token, ...user } = await apiFetch(`users/${id}`);
    
    return user;
}