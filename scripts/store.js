import { fromLocalStorage, saveToLocalStorage } from "./utils.js";

const STORE = {
    currentPage: fromLocalStorage("current-page") || "login",
    user: null,
    boards: [],
    setUser(user) {
        this.user = user;
    },
    setCurrentPage(page) {
        saveToLocalStorage("current-page", page);
        this.currentPage = page;
    },
    setBoards(boards) {
        this.boards = boards;
    }
}

export default STORE;