import STORE from "./../store.js"
import DOMHandler from "./../dom-handler.js"
import { getBoards, updateBoard, validColor } from "../services/board-services.js";

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
                <form class="board-form green">
                    <input type="hidden" value="gray" name="color" />
                    <input type="text" name="name" class="board-form__input" placeholder="Board Name" required/>
                    <button type="submit" class="board-form__button">create</button>
                </form>
                <a href="#" class="close-icon">
                    <img src="./assets/icons/close.svg" alt="close-icon" />
                </a>
            </div>
        </section>
    `
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
    }
}

export default myBoards;