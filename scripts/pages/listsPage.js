import DOMHandler from "../dom-handler.js";
import STORE from "../store.js";
import HomePage from "./homePage.js";

function render() {
    const board = STORE.currentBoard || JSON.parse(localStorage.getItem("currentBoard"));
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));
    
    return `
        <main class="lists-section">
            <header class="lists__header">
                <a href="#" class="back-button">
                    <img src="./assets/icons/back.svg" alt="back-icon" />
                    <p>Back</p>
                </a>
                <img src="./../assets/images/logo.png" class="logo" alt="logo-image">
            </header>
            <div class="lists__container ${board.color}">
                <header>
                    <h1 class="lists__title">${board.name}</h1>
                </header>
                <div class="lists">

                </div>
            </div>
        </main>
    `
}

function listenBackButton() {
    const button = document.querySelector(".back-button");
    const root = document.querySelector("#root");

    button.addEventListener("click", e => {
        e.preventDefault();

        STORE.setCurrentPage("boards");
        DOMHandler.load(HomePage(), root);
    })
}

function ListPage() {
    return {
        toString() {
            return render();
        },
        addListeners() {
            listenBackButton();
        }
    }
}

export default ListPage;