import { input } from "./../components/input.js";
import { signup } from "./../services/user-services.js";
import { tokenKey } from "./../config.js";
import DOMHanlder from "./../dom-handler.js"
import LoginPage from "./loginPage.js"
import STORE from "../store.js";
import { getBoards } from "../services/board-services.js";

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
                    type: "text"
                })}

                <div class="form__container-buttons">
                    <button type="submit" class="form__submit">Create Account</button>
                    <a href="#" class="form__link">Login</a>
                </div>
            </form>
        </main>
    `
}

function SignUpPage() {
    return {
        toString() {
            return render();
        },
        addListeners() {

        }
    }
}

export default SignUpPage;