import DOMHandler from "./../dom-handler.js";
import { tokenKey } from "./../config.js";
import LoginPage from "./loginPage.js";
import STORE from "../store.js";
import { createBoard, deleteBoard } from "../services/board-services.js";
import { logout } from "../services/session-services.js";

function render() {
    return `
        <div class="container-home">
            <aside class="home__aside">
                <div class="aside__navbar">
                    <img src="./../assets/images/logo.png" class="logo" alt="logo-image">
                    <a href="#" class="navbar__link selected">
                        <img src="./../assets/icons/board.svg" alt="board-icon">
                        <p class="navbar__link__text">My Boards</p>
                    </a>
                    <a href="#" class="navbar__link">
                        <img src="./../assets/icons/files.svg" alt="board-icon">
                        <p class="navbar__link__text">Closed Boards</p>
                    </a>
                    <a href="#" class="navbar__link">
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
        }
    }
}

export default HomePage;