import { tokenKey } from "./config.js";
import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/loginPage.js";
import STORE from "./store.js";

const root = document.querySelector("#root");

export async function App() {
    return DOMHandler.load(LoginPage(), root);
}