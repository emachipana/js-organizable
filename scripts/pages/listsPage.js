function render() {
    return `
        <main class="lists-section">
            <header class="lists__header">
                <img src="./../assets/images/logo.png" class="logo" alt="logo-image">
            </header>
        </main>
    `
}

function ListPage() {
    return {
        toString() {
            return render();
        },
        addListeners() {

        }
    }
}

export default ListPage;