import axios from "axios";

async function getParsedMessages() {
    console.log('here we are');
    await axios('http://localhost:4000/api/create-orders')
        .then((response) => {
            console.log(response.data);
        });
}
setTimeout(await getParsedMessages, 10000);
