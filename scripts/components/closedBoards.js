function render() {
    return `
        <header>
            <h1 class="home__main__title">Closed Boards</h1>
        </header>
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