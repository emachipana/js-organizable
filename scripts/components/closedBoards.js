import STORE from "../store.js";
import DOMHandler from "../dom-handler.js";
import { getBoards, updateBoard, deleteBoard, validColor } from "./../services/board-services.js"

function renderBoard(board){
    return `
        <div class="card ${validColor(board.color)}">
            <p class="card__title">${board.name}</p>
            <div class="card__buttons">
                <a href="#" class="card-button">
                    <img src="./../assets/icons/recover.svg" alt="recover-icon" data-action="delete" data-id="${board.id}">
                </a>
                <a href="#" class="card-button">
                    <img src="./../assets/icons/trash.svg" alt="trash-icon" data-action="deletePer" data-id="${board.id}">
                </a>
            </div>
        </div>
    `
}

function render() {
    return `
        <header>
            <h1 class="home__main__title">Closed Boards</h1>
        </header>
        <section class="home__section-cards">
            <div class="container-cards">
                ${STORE.closedBoards.map(renderBoard).join("")}
            </div>
        </section>
    `
}

const closedBoards = {
    toString() {
        return render();
    },
    addListeners() {

    }
}

export default closedBoards;