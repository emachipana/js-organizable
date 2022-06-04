import STORE from "./../store.js"
import DOMHandler from "./../dom-handler.js"
import { getBoards, updateBoard, validColor, createBoard } from "../services/board-services.js";

function renderBoard(board){
    return `
        <div class="card ${validColor(board.color)}">
            <p class="card__title">${board.name}</p>
            <div class="card__buttons">
                <a href="#" class="card-button">
                    <img src="./../assets/icons/trash.svg" alt="trash-icon" data-action="update" data-id="${board.id}">
                </a>
                <a href="#" class="card-button">
                    <img src="./../assets/icons/${board.starred ? "star-fill.svg" : "star.svg"}" alt="star-icon" data-action="starred" data-id="${board.id}">
                </a>
            </div>
        </div>
    `
}

function renderStarredBoards(boards) {
    return `
        <section class="home__section-cards">
            <h2 class="cards__title">Starred Boards</h2>
            <div class="container-cards">
                ${boards.map(renderBoard).join("")}
            </div>
        </section>
    `
}

function render() {
    return `
        <header>
            <h1 class="home__main__title">My Boards</h1>
        </header>
        ${STORE.starredBoards.length > 0 ? renderStarredBoards(STORE.starredBoards) : ""}
        <section class="home__section-cards">
            <h2 class="cards__title">Boards</h2>
            <div class="container-cards">
                ${STORE.boards.map(renderBoard).join("")}
                <div class="create-container">
                    <p>Create Board</p>
                </div>
            </div>
            <div class="modal none">
                <div class="new-board">
                    <form class="board-form green">
                        <input type="hidden" value="green" name="color" />
                        <input type="text" name="boardName" class="board-form__input" placeholder="Board Name" required/>
                        <p class="error-message"></p>
                        <input type="submit" class="board-form__button" value="create" />
                    </form>
                    <ul class="color-palette">
                        <li class="color__item greenyellow" data-color="greenyellow"></li>
                        <li class="color__item red" data-color="red"></li>
                        <li class="color__item blue" data-color="blue"></li>
                        <li class="color__item orange" data-color="orange"></li>
                        <li class="color__item purple" data-color="purple"></li>
                        <li class="color__item pink" data-color="pink"></li>
                        <li class="color__item green" data-color="green"></li>
                        <li class="color__item gray" data-color="gray"></li>
                        <li class="color__item skyblue" data-color="skyblue"></li>
                    <ul>
                    </div>
                    <a href="#" class="close-icon">
                        <img src="./assets/icons/close.svg" alt="close-icon" />
                    </a>
            </div>
        </section>
    `
}

function listenSubmitForm() {
    const form = document.querySelector(".board-form");
    const button = document.querySelector(".board-form__button");
    const p = document.querySelector(".error-message");
    const modal = document.querySelector(".modal");

    button.addEventListener("click", async e => {
        e.preventDefault();

        const color = form.color.value;
        const boardName = form.boardName.value;
        if(!boardName) return p.textContent = "can't be blank";
        const data = {
            color,
            name: boardName
        }

        await createBoard(data);
        const boards = await getBoards();
        STORE.setBoards(boards);
        modal.classList.add("none");

        DOMHandler.reload();
    })
}

function listenColorPalette() {
    const ul = document.querySelector(".color-palette");
    const form = document.querySelector(".board-form")

    ul.addEventListener("click", e => {
        e.preventDefault()

        const color = e.target.getAttribute("data-color")
        if(!color) return
        form.className = `board-form ${color}`;
        form.color.value = color
    })
}

function listenCreateBoard() {
    const el = document.querySelector(".create-container");
    const modal = document.querySelector(".modal");

    el.addEventListener("click", e => {
        e.preventDefault();

        modal.classList.remove("none");
    })
}

function closeModal() {
    const button = document.querySelector(".close-icon");
    const modal = document.querySelector(".modal");

    button.addEventListener("click", e => {
        e.preventDefault();

        modal.classList.add("none");
    })
}

function listenUpdateBoard() {
    const button = document.querySelector(".home__main");

    button.addEventListener("click", async e => {
        e.preventDefault();

        const action = e.target.getAttribute("data-action");
        if(!action) return
        const id = e.target.getAttribute("data-id");
        if(!id) return
        await updateBoard(action, id);
        const boards = await getBoards();
        STORE.setBoards(boards);

        DOMHandler.reload();
    })
}

const myBoards = {
    toString() {
        return render();
    },
    addListeners() {
        listenUpdateBoard();
        listenCreateBoard();
        closeModal();
        listenColorPalette();
        listenSubmitForm();
    }
}

export default myBoards;