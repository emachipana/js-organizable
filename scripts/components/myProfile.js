import DOMHandler from "./../dom-handler.js"
import { input } from "./../components/input.js";
import STORE from "../store.js";
import { currentUserKey, tokenKey } from "../config.js";
import { deleteUser, updateProfile } from "../services/user-services.js";
import LoginPage from "../pages/loginPage.js";

function render() {
    const user = STORE.user;

    return `
        <header>
            <h1 class="home__main__title">My Profile</h1>
        </header>
        <section class="home__section-cards profile">
            <form class="sessions-container__form">

                ${input({
                    label: "username",
                    icon: "./../assets/icons/avatar.svg",
                    id: "username",
                    required: true,
                    placeholder: "username",
                    type: "text",
                    value: user.username
                }
                )}

                ${input({
                    label: "email",
                    icon: "./../assets/icons/mail.svg",
                    id: "email",
                    required: true,
                    placeholder: "example@mail.com",
                    type: "email",
                    value: user.email
                })}

                ${input({
                    label: "first name",
                    icon: "./../assets/icons/info.svg",
                    id: "first_name",
                    required: true,
                    placeholder: "first name",
                    type: "text",
                    value: user.firstName
                })}

                ${input({
                    label: "last name",
                    icon: "./../assets/icons/info.svg",
                    id: "last_name",
                    required: true,
                    placeholder: "last name",
                    type: "text",
                    value: user.lastName
                })}

                <div class="form__container-buttons">
                    <button type="submit" class="form__submit form__submit--profile">Update Profile</button>
                    <a href="#" class="form__submit form__submit--delete">delete my account</a>
                </div>
            </form>
        </section>
    `
}

function listenSubmitForm() {
    const form = document.querySelector(".sessions-container__form");
    const currentUser = STORE.user;

    form.addEventListener("submit", async e => {
        e.preventDefault()

        const { username, email, first_name, last_name} = e.target;
        const payload = {
            username: username.value,
            email: email.value,
            first_name: first_name.value,
            last_name: last_name.value
        }

        const userUpdated = await updateProfile(currentUser.id, payload);
        STORE.setUser(userUpdated);
        sessionStorage.setItem(currentUserKey, JSON.stringify(userUpdated))

        DOMHandler.reload();
    })
}

function listenDeleteAccount() {
    const button = document.querySelector(".form__submit--delete");
    const root = document.querySelector("#root");
    const currentUser = STORE.user;

    button.addEventListener("click", async e => {
        e.preventDefault();

        await deleteUser(currentUser.id);
        sessionStorage.removeItem(tokenKey);
        sessionStorage.removeItem(currentUserKey);
        STORE.setCurrentPage("login");

        DOMHandler.load(LoginPage(), root);
    })
}

const myProfile = {
    toString() {
        return render();
    },
    addListeners() {
        listenSubmitForm();
        listenDeleteAccount();
    }
}

export default myProfile;