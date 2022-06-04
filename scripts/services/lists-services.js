import { tokenKey } from "./../config.js";
import apiFetch from "./api-fetch.js"

export function getLists(board) {
    return board.lists;
}

export function createList(boardId, newList = { listName }) {
    const listCreated = await apiFetch(`boards/${boardId}/lists`, { body: newList });

    return listCreated;
}