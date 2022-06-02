import { boardKey, tokenKey } from "../config.js";
import apiFetch from "./api-fetch.js";

export async function getBoards() {
    const boards = await apiFetch("boards");

    return boards;
}

export async function getBoard(id) {
    const board = await apiFetch(`boards/${id}`);

    return board;
}