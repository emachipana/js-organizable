import { tokenKey } from "./config.js";
import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/loginPage.js";
import SignUpPage from "./pages/signupPage.js";
import STORE from "./store.js";
import { getUser } from "./services/user-services.js";
import { getBoards } from "./services/board-services.js";

const root = document.querySelector("#root");

const router = {
    "login": LoginPage,
    "signup": SignUpPage,
    "boards": "pending",
    "lists": "pending"
}

export async function App() {
    const token = sessionStorage.getItem(tokenKey);
    let module;

    if(!token) {
        if(["login", "signup"].includes(STORE.currentPage)) {
            module = router[STORE.currentPage];
        } else {
            module = LoginPage;
        }

        return DOMHandler.load(module(), root);
    }

    try {
        const { token, ...user } = await getUser();
        STORE.setUser(user);

        const boards = await getBoards();
        STORE.setBoards(boards);

        module = router[STORE.currentPage];
    } catch (e) {
        module = LoginPage;
    }

    return DOMHandler.load(module(), root);
}