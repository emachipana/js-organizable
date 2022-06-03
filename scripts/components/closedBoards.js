function render() {
    return `
        <header>
            <h1 class="home__main__title">Closed Boards</h1>
        </header>
    `
}

function closedBoards() {
    return {
        toString() {
            return render();
        },
        addListeners() {

        }
    }
}

export default closedBoards;