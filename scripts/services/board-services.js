import apiFetch from "./api-fetch.js";

export async function getBoards() {
    const boards = await apiFetch("boards");

    return boards;
}

export async function getBoard(id) {
    const board = await apiFetch(`boards/${id}`);

    return board;
}

export async function createBoard(newBoard = {name, color}) {
    const boardCreated = await apiFetch("boards", { body: newBoard });

    return boardCreated;
}

export async function deleteBoard(id) {
    const boardDeleted = await apiFetch(`boards/${id}`, { method: "DELETE" });

    return boardDeleted;
}