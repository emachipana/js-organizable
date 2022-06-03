import { login } from "./../services/session-services.js";
import { input } from "./../components/input.js";
import DOMHandler from "./../dom-handler.js";
import STORE from "./../store.js";
import { getBoards } from "./../services/board-services.js";
import SignUpPage from "./signupPage.js"
import HomePage from "./homePage.js";

function render() {
    return `
        <main class="sessions-container">
            <header class="sessions-container__header">
                <img src="./../assets/images/logo.png" class="logo" alt="logo-image">
                <h1 class="header__title">Login</h1>
            </header>
            <form class="sessions-container__form">
                ${input({
                    label: "username",
                    icon: "./../assets/icons/avatar.svg",
                    id: "username",
                    required: true,
                    value: "enmanuel",
                    placeholder: "username",
                    type: "text"
                })}

                ${input({
                    label: "password",
                    icon: "./../assets/icons/key.svg",
                    id: "password",
                    required: true,
                    value: "123456",
                    placeholder: "password",
                    type: "password"
                })}

                <div class="form__container-buttons">
                    <button type="submit" class="form__submit">Login</button>
                    <a href="#" class="form__link signup">Create Account</a>
                </div>
            </form>
        </main>
    `
}

function listenSignUpLink() {
    const link = document.querySelector(".signup");
    const root = document.querySelector("#root");

    link.addEventListener("click", event => {
        event.preventDefault();

        STORE.setCurrentPage("signup");
        DOMHandler.load(SignUpPage(), root);
    })
}

function listenSubmitForm() {
    const form = document.querySelector(".sessions-container__form");
    const root = document.querySelector("#root");

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const { username, password } = e.target;
        const credentials = {
            username: username.value,
            password: password.value
        }

        const user = await login(credentials);

        STORE.setUser(user);
        STORE.setCurrentPage("boards");

        const boards = await getBoards();
        STORE.setBoards(boards);

        DOMHandler.load(HomePage(), root)
    })
}

function LoginPage() {
    return {
        toString() {
            return render();
        },
        addListeners() {
            listenSignUpLink();
            listenSubmitForm();
        }
    }
}

export default LoginPage;