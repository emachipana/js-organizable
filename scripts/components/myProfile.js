function render() {
    render `
        <header>
            <h1 class="home__main__title">My Profile</h1>
        </header>
    `
}

function myProfile() {
    return {
        toString() {
            return render()
        },
        addListeners() {

        }
    }
}

export default myProfile;