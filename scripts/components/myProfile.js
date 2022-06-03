function render() {
    return `
        <header>
            <h1 class="home__main__title">My Profile</h1>
        </header>
    `
}

const myProfile = {
    toString() {
        return render();
    },
    addListeners() {

    }
}

export default myProfile;