function render() {
    return `
        <header>
            <h1 class="home__main__title">My Boards</h1>
        </header>
    `
}

function myBoards() {
    return {
        toString() {
            return render();
        },
        addListeners() {

        }
    }
}

export default myBoards;