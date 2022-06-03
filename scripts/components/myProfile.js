import DOMHandler from "./../dom-handler.js"
import { input } from "./../components/input.js";
import STORE from "../store.js";

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

const myProfile = {
    toString() {
        return render();
    },
    addListeners() {

    }
}

export default myProfile;