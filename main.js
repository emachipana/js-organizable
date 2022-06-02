import { getBoards, getBoard } from "./scripts/services/board-services.js";
import { login } from "./scripts/services/session-services.js";


const credentials = {
    username: "enmanuel",
    password: "123456"
}


async function test() {
    await login(credentials);
    // const data = await getBoards();
    // const data = await getBoard(696);
    console.log(data);
}

test();