import STORE from "../store.js";
import apiFetch from "./api-fetch.js"

export function getLists(board) {
    return board.lists;
}

export async function createList(boardId, newList = { listName }) {
    const listCreated = await apiFetch(`boards/${boardId}/lists`, { body: newList });

    return listCreated;
}

export async function updateList(boardId, listId, payload = { listName }) {
    const listUpdated = await apiFetch(`boards/${boardId}/lists/${listId}`, { method: "PATCH", body: payload });

    return listUpdated;
}

export async function deleteList(boardId, listId) {
    await apiFetch(`boards/${boardId}/lists/${listId}`, { method: "DELETE" });
}

export async function updateListOrder(ids) {
    const board = STORE.currentBoard || JSON.parse(localStorage.getItem("currentBoard"));
    await apiFetch(`boards/${board.id}/lists/sort`, { body: { ids: ids } });
    return board.id;
}

// tener un current board en localStorage para manejar su id