import { getBoards, getBoard, createBoard, deleteBoard } from "./scripts/services/board-services.js";
import { login } from "./scripts/services/session-services.js";


const credentials = {
    username: "enmanuel",
    password: "123456"
}


async function test() {
    const newCard = {
        name: "new-card2",
        color: "red"
    }

    await login(credentials);
    const data = await getBoards();
    // const data = await getBoard(696);
    // const data = await createBoard(newCard);
    // const data = await deleteBoard(712);
    console.log(data);
}

test();