import { fromLocalStorage, saveToLocalStorage } from "./utils.js";

const STORE = {
    currentPage: fromLocalStorage("current-page") || "login",
    user: null,
    boards: [],
    starredBoards: [],
    closedBoards: [],
    setUser(user) {
        this.user = user;
    },
    setCurrentPage(page) {
        saveToLocalStorage("current-page", page);
        this.currentPage = page;
    },
    setBoards(boards) {
        this.boards = boards.filter(board => board.starred === false && board.closed === false);
        this.starredBoards = boards.filter(board => board.starred === true && board.closed === false)
        this.closedBoards = boards.filter(board => board.closed === true);
    }
}

export default STORE;