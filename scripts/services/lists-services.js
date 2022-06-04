import { tokenKey } from "./../config.js";
import apiFetch from "./api-fetch.js"

export function getLists(board) {
    return board.lists;
}

export function createList(boardId, newList = { listName }) {
    const listCreated = await apiFetch(`boards/${boardId}/lists`, { body: newList });

    return listCreated;
}

export function updateList(boardId, listId, payload = { listName }) {
    const listUpdated = await apiFetch(`boards/${boardId}/lists/${listId}`, { method: "PATCH", body: payload });

    return listUpdated;
}

export function deleteList(boardId, listId) {
    await apiFetch(`boards/${boardId}/lists/${listId}`, { method: "DELETE" });
}