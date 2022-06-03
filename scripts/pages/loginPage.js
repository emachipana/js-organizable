import { login } from "./../services/session-services.js";
import { input } from "./../components/input.js";
import { tokenKey } from "../config.js";
import DOMHandler from "./../dom-handler.js"
import STORE from "./../store.js"
import { getBoards } from "./../services/board-services.js"

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
                    <a href="#" class="form__link">Create Account</a>
                </div>
            </form>
        </main>
    `
}

function LoginPage() {
    return {
        toString() {
            return render();
        },
        addListeners() {

        }
    }
}

export default LoginPage;