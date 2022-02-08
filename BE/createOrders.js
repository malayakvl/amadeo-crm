import axios from "axios";

async function getParsedMessages() {
    await axios('http://localhost:4000/api/create-orders')
        .then((response) => {
        });
}
setTimeout(await getParsedMessages, 10000);
