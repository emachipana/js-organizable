import DOMHandler from "../dom-handler.js";
import { createList } from "../services/lists-services.js";
import STORE from "../store.js";
import HomePage from "./homePage.js";

function renderCard(card) {
    return `
        <div class="list__card">
            <h2 class="list__card__text">${card.name}</h2>
            <a href="#">
                <img src="./../assets/icons/trash.svg" alt="trash-icon">
            </a>
        </div>
    `
}

function renderLists(list) {
    const cards = list.cards;

    return `
        <div class="list move">
            <section class="list__header">
                <h1 class="list__header__title">${list.name}</h1>
                <div class="list__header__buttons">
                    <a href="#">
                        <img src="./../assets/icons/edit.svg" alt="edit-icon">
                    </a>
                    <a href="#">
                        <img src="./../assets/icons/trash.svg" alt="trash-icon">
                    </a>
                </div>
            </section>
            <hr>
            <section class="list__cards">
                ${cards.map(renderCard).join("")}
            </section>
            <form class="list__form out">
                <input type="text" name="card" id="card" class="form__card-input" placeholder="new card" required>
                <a href="#" class="form__card-icon">
                    <img src="./../assets/icons/add.svg" alt="add-icon">
                </a>
            </form>
        </div>
    `
}

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
                    ${lists.map(renderLists).join("")}
                    <div class="list">
                        <form class="list__form new-list">
                            <input type="text" name="listName" id="listName" class="form__card-input" placeholder="new list" required>
                            <button type="submit" class="form__card-icon">
                                <img src="./../assets/icons/add.svg" alt="add-icon">
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    `
}

function listenSubmitNewList() {
    const board = STORE.currentBoard || JSON.parse(localStorage.getItem("currentBoard"));
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));
    const form = document.querySelector(".new-list");

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const { listName } = e.target;
        const data = {
            name: listName.value
        }

        const newList = await createList(board.id, data);
        const list = {
            ...newList,
            listId: newList.id,
            cards: []
        }
        lists.push(list);
        STORE.setCurrentLists(lists);
        
        DOMHandler.reload();
    })
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
            listenSubmitNewList();
        }
    }
}

export default ListPage;