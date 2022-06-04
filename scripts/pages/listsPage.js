import DOMHandler from "../dom-handler.js";
import { createCard, deleteCard } from "../services/card-services.js";
import { createList, deleteList, updateList } from "../services/lists-services.js";
import STORE from "../store.js";
import HomePage from "./homePage.js";

function renderCard(card, listId) {
    return `
        <div class="list__card">
            <h2 class="list__card__text">${card.name}</h2>
            <a href="#">
                <img src="./../assets/icons/trash.svg" alt="trash-icon" data-card="deleteCard" data-cardId="${card.cardId}" data-listId="${listId}">
            </a>
        </div>
    `
}

function renderLists(list) {
    const cards = list.cards;

    return `
        <div class="list move">
            <section class="list__header ${list.name.replace(/ /g, "") + list.listId}">
                <h1 class="list__header__title">${list.name}</h1>
                <div class="list__header__buttons">
                    <a href="#">
                        <img src="./../assets/icons/edit.svg" alt="edit-icon" data-listId="${list.listId}" data-action="update" data-name="${list.name.replace(/ /g, "")}">
                    </a>
                    <a href="#">
                        <img src="./../assets/icons/trash.svg" alt="trash-icon" data-listId="${list.listId}" data-action="delete">
                    </a>
                </div>
            </section>
            <form class="form-editList ${list.name.replace(/ /g, "") + list.listId}1 none">
                <input type="text" name="listName" id="card" class="form__card-input edit-input" placeholder="edit card" value="${list.name}" required>
                <button type="submit" class="form__card-icon ${list.name.replace(/ /g, "") + list.listId}3">
                    <img src="./../assets/icons/check.svg" alt="add-icon">
                </button>
                <a href="#" class="form__card-icon ${list.name.replace(/ /g, "") + list.listId}2">
                    <img src="./../assets/icons/close.svg" />
                </a>
            </form>
            <hr>
            <section class="list__cards">
                ${cards.map(card => renderCard(card, list.listId)).join("")}
            </section>
            <form class="list__form out form${list.listId}">
                <input type="text" name="cardName" id="card" class="form__card-input" placeholder="new card" required>
                <button href="#" class="form__card-icon">
                    <img src="./../assets/icons/add.svg" alt="add-icon" data-name="newCard" data-idList="${list.listId}">
                </button>
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
                            <button type="submit" class="form__card-icon new-listButton">
                                <img src="./../assets/icons/add.svg" alt="add-icon">
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    `
}

function listenDeleteCard() {
    const link = document.querySelector(".lists");
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));
    
    link.addEventListener("click", async e => {
        e.preventDefault();

        if(!e.target.getAttribute("data-card")) return
        const cardId = e.target.getAttribute("data-cardId");
        if(!cardId) return
        const listId = e.target.getAttribute("data-listId");
        await deleteCard(listId, cardId);

        const index = lists.findIndex(list => list.listId == listId);
        const indexCard = lists[index].cards.findIndex(card => card.cardId == cardId);
        lists[index].cards.splice(indexCard, 1);

        STORE.setCurrentLists(lists);

        DOMHandler.reload();
    })
}

function listenNewCard() {
    const button = document.querySelector(".lists");
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));

    button.addEventListener("click", async e => {
        if(!e.target.getAttribute("data-name")) return;
        const listId = e.target.getAttribute("data-idList");
        if(!listId) return

        const form = document.querySelector(`.form${listId}`)
        const list = lists.find(list => list.listId == listId );
        const index = lists.findIndex(list => list.listId == listId );

        if(!form.cardName.value) return

        const data = {
            name: form.cardName.value
        }

        const newCard = await createCard(listId, data);

        const card = {
            ...newCard,
            cardId: newCard.id
        }

        list.cards.push(card);
        lists[index] = list;
        STORE.setCurrentLists(lists);

        DOMHandler.reload();
    })
}

function listenCancelEdit(className) {
    const button = document.querySelector(`.${className}2`);

    button.addEventListener("click", e => {
        e.preventDefault()

        DOMHandler.reload();
    })
}

function listenSubmitNewList() {
    const board = STORE.currentBoard || JSON.parse(localStorage.getItem("currentBoard"));
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));
    const form = document.querySelector(".new-list");
    const button = document.querySelector(".new-listButton")

    button.addEventListener("click", async e => {
        e.preventDefault();

        const listName = form.listName;

        if(!listName.value) return

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

async function deleteActualList(listId, boardId) {
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));
    await deleteList(boardId, listId);

    const index = lists.findIndex(list => list.listId == listId);

    lists.splice(index, 1);

    STORE.setCurrentLists(lists);

    DOMHandler.reload();
}

async function editActualList(listId, boardId, form, className) {
    const lists = STORE.currentLists || JSON.parse(localStorage.getItem("currentLists"));
    const button = document.querySelector(`.${className}3`);

    button.addEventListener("click", async e => {
        e.preventDefault();

        const newName = form.listName.value

        if(!newName) return

        const payload = {
            name: newName
        }
        const listUpdated = await updateList(boardId, listId, payload);

        const index = lists.findIndex(list => list.listId === listUpdated.id );
        lists[index].name = listUpdated.name; 

        STORE.setCurrentLists(lists);

        DOMHandler.reload();
    })
}

function listenChangeStateList() {
    const board = STORE.currentBoard || JSON.parse(localStorage.getItem("currentBoard"));
    const list = document.querySelector(".lists");

    list.addEventListener("click", e => {
        e.preventDefault()

        const action = e.target.getAttribute("data-action");
        if(!action) return

        const listId = e.target.getAttribute("data-listId");
        if(!listId) return
        if(action === "delete"){
            return deleteActualList(listId, board.id);
        }else {
            const name = e.target.getAttribute("data-name");
            const currentList = document.querySelector(`.${name + listId}`);
            currentList.classList.add("none");
            const form = document.querySelector(`.${name + listId}1`)
            form.classList.remove("none");
            listenCancelEdit(name + listId);

            return editActualList(listId, board.id, form, name + listId);
        }
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
            listenChangeStateList();
            listenNewCard();
            listenDeleteCard();
        }
    }
}

export default ListPage;