import DOMHandler from "./../dom-handler.js";
import { tokenKey } from "./../config.js";
import LoginPage from "./loginPage.js";
import STORE from "../store.js";
import { createBoard, deleteBoard } from "../services/board-services.js";
import { logout } from "../services/session-services.js";
import HomePagesHanlder from "./homePagesHandler.js";
import myBoards from "../components/myBoards.js";
import closedBoards from "../components/closedBoards.js";
import myProfile from "../components/myProfile.js";

function render() {
    return `
        <div class="container-home">
            <aside class="home__aside">
                <div class="aside__navbar">
                    <img src="./../assets/images/logo.png" class="logo" alt="logo-image">
                    <a href="#" class="navbar__link ${HomePagesHanlder.currentPage === "myBoards" ? "selected" : "" }">
                        <img src="./../assets/icons/board.svg" alt="board-icon">
                        <p class="navbar__link__text">My Boards</p>
                    </a>
                    <a href="#" class="navbar__link ${HomePagesHanlder.currentPage === "closedBoards" ? "selected" : "" }">
                        <img src="./../assets/icons/files.svg" alt="board-icon">
                        <p class="navbar__link__text">Closed Boards</p>
                    </a>
                    <a href="#" class="navbar__link ${HomePagesHanlder.currentPage === "myProfile" ? "selected" : "" }">
                        <img src="./../assets/icons/avatar.svg" alt="board-icon">
                        <p class="navbar__link__text">My Profile</p>
                    </a>
                </div>
                <div class="aside__logout">
                    <hr class="hr">
                    <a href="#" class="navbar__link logout">
                        <img src="./../assets/icons/logout.svg" alt="logout-icon">
                        <p class="form__link">Log Out</p>
                    </a>
                </div>
            </aside>
            <main class="home__main">
                ${HomePagesHanlder.currentPage === "myBoards" ? myBoards() : "" }
                ${HomePagesHanlder.currentPage === "closedBoards" ? closedBoards() : ""}
                ${HomePagesHanlder.currentPage === "myProfile" ? myProfile() : ""}
            </main>
        </div>

    `
}

function listenLogoutLink() {
    const link = document.querySelector(".logout");
    const root = document.querySelector("#root");

    link.addEventListener("click", async e => {
        e.preventDefault()

        await logout()
        STORE.setCurrentPage("login");
        DOMHandler.load(LoginPage(), root);
    })
}

function HomePage() {
    return {
        toString() {
            return render();
        },
        addListeners() {
            listenLogoutLink();
            if(HomePagesHanlder.currentPage === "myBoards") myBoards.addListeners();
            if(HomePagesHanlder.currentPage === "closedBoards") closedBoards.addListeners();
            if(HomePagesHanlder.currentPage === "myProfile") myProfile.addListeners();
        }
    }
}

export default HomePage;