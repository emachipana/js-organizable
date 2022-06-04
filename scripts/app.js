import { tokenKey, currentUserKey } from "./config.js";
import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/loginPage.js";
import SignUpPage from "./pages/signupPage.js";
import HomePage from "./pages/homePage.js"
import STORE from "./store.js";
import { getBoards } from "./services/board-services.js";
import HomePagesHanlder, { homePagesKey } from "./pages/homePagesHandler.js";
import ListPage from "./pages/listsPage.js";

const root = document.querySelector("#root");

const router = {
    "login": LoginPage,
    "signup": SignUpPage,
    "boards": HomePage,
    "lists": ListPage
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
        const user = JSON.parse(sessionStorage.getItem(currentUserKey))
        STORE.setUser(user);
        const boards = await getBoards();
        STORE.setBoards(boards);

        const homepages = JSON.parse(localStorage.getItem(homePagesKey));
        
        if(!homepages){
            HomePagesHanlder.setCurrentPage("myBoards");
        }

        module = router[STORE.currentPage];
    } catch (e) {
        module = LoginPage;
    }

    return DOMHandler.load(module(), root);
}