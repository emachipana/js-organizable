import { getBoards, getBoard, createBoard } from "./scripts/services/board-services.js";
import { login } from "./scripts/services/session-services.js";


const credentials = {
    username: "enmanuel",
    password: "123456"
}


async function test() {
    const newCard = {
        name: "new-card",
        color: "red"
    }

    await login(credentials);
    // const data = await getBoards();
    // const data = await getBoard(696);
    // const data = await createBoard(newCard);
    console.log(data);
}

test();