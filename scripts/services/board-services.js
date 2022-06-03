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

export async function updateBoard(action, id) {
    const board = await getBoard(id)
    let body;
    if(action === "delete") {
        if(board.closed === false) {
            body = {closed: true}
        } else {
            body = {closed: false}
        }
    }else {
        if(board.starred === false) {
            body = {starred: true}
        }else {
            body = {starred: false}
        }
    }
    await apiFetch(`boards/${id}`, {method: "PATCH", body: body });
}

export function validColor(color) {
    const colors = [ "greenyellow", "green", "orange", "red", "purple", "blue", "pink", "gray", "skyblue" ];
    if(colors.includes(color)){
        return color;
    } else {
        return "gray";
    }
}