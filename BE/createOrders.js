import axios from "axios";
import 'dotenv/config';

const apiUrl = process.env.API_URL;


async function getParsedMessages() {
    console.log('here we are');
    
    await axios(`${apiUrl}/api/create-orders`)
        .then((response) => {
            console.log(response.data);
        });
}
setTimeout(await getParsedMessages, 10000);
