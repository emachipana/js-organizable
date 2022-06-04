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

export async function updateListOrder(boardId, data = { ids }) {
    await apiFetch(`boards/${boardId}/lists/sort`, { body: data });
}

// tener un current board en localStorage para manejar su id