import { input } from "./../components/input.js";
import { signup } from "./../services/user-services.js";
import DOMHandler from "./../dom-handler.js"
import LoginPage from "./loginPage.js"
import STORE from "../store.js";
import { getBoards } from "../services/board-services.js";
import HomePage from "./homePage.js";
import { currentUserKey } from "../config.js";

function render() {
    return `
        <main class="sessions-container">
            <header class="sessions-container__header">
                <img src="./../assets/images/logo.png" class="logo" alt="logo-image">
                <h1 class="header__title">Create Account</h1>
            </header>
            <form class="sessions-container__form">
                
                ${input({
                    label: "username",
                    icon: "./../assets/icons/avatar.svg",
                    id: "username",
                    required: true,
                    placeholder: "username",
                    type: "text"
                }
                )}

                ${input({
                    label: "email",
                    icon: "./../assets/icons/mail.svg",
                    id: "email",
                    required: true,
                    placeholder: "example@mail.com",
                    type: "email"
                })}

                ${input({
                    label: "first name",
                    icon: "./../assets/icons/info.svg",
                    id: "first_name",
                    required: true,
                    placeholder: "first name",
                    type: "text"
                })}

                ${input({
                    label: "last name",
                    icon: "./../assets/icons/info.svg",
                    id: "last_name",
                    required: true,
                    placeholder: "last name",
                    type: "text"
                })}

                ${input({
                    label: "password",
                    icon: "./../assets/icons/key.svg",
                    id: "password",
                    required: true,
                    placeholder: "password",
                    type: "password"
                })}

                <div class="form__container-buttons">
                    <button type="submit" class="form__submit">Create Account</button>
                    <a href="#" class="form__link login">Login</a>
                </div>
            </form>
        </main>
    `
}

function listenLoginLink() {
    const link = document.querySelector(".login");
    const root = document.querySelector("#root");

    link.addEventListener("click", event => {
        event.preventDefault();

        STORE.setCurrentPage("login");
        DOMHandler.load(LoginPage(), root)
    })
}

function listenSubmitForm() {
    const form = document.querySelector(".sessions-container__form");
    const root = document.querySelector("#root");

    form.addEventListener("submit", async e => {
        e.preventDefault();

        const { username, email, first_name, last_name, password } = e.target;
        const credentials = {
            username: username.value,
            email: email.value,
            first_name: first_name.value,
            last_name: last_name.value,
            password: password.value
        }

        const user = await signup(credentials);
        STORE.setUser(user);
        sessionStorage.setItem(currentUserKey, JSON.stringify(user))
        STORE.setCurrentPage("boards");
        const boards = await getBoards();
        STORE.setBoards(boards);

        DOMHandler.load(HomePage(), root);
    })
}

function SignUpPage() {
    return {
        toString() {
            return render();
        },
        addListeners() {
            listenLoginLink();
            listenSubmitForm();
        }
    }
}

export default SignUpPage;