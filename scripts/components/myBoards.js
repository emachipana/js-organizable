import STORE from "./../store.js"

function validColor(color) {
    const colors = [ "greenyellow", "green", "orange", "red", "purple", "blue", "pink", "gray", "skyblue" ];
    if(colors.includes(color)){
        return color;
    } else {
        return "gray";
    }
}

function renderBoard(board){
    return `
        <div class="card ${validColor(board.color)}">
            <p class="card__title">${board.name}</p>
            <div class="card__buttons">
                <a href="#" class="card-button">
                    <img src="./../assets/icons/trash.svg" alt="trash-icon">
                </a>
                <a href="#" class="card-button">
                    <img src="./../assets/icons/star.svg" alt="star-icon">
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
            </div>
        </section>
    `
}

const myBoards = {
    toString() {
        return render();
    },
    addListeners() {

    }
}

export default myBoards;