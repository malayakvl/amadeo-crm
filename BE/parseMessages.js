import axios from "axios";
import 'dotenv/config';

const apiUrl = process.env.API_URL;


const getParseComment = (data) => {
    console.log(`parsing comment for live video id ${data.id}`);
    axios(`${apiUrl}/api/parse-live-messages?sessionId=${data.id}`)
        .then((response) => {
            console.log(response.data.message);
        });
}


async function getActiveLiveSession() {
    console.log(`${apiUrl}/api/fetch-live-sessions`);
    await axios(`${apiUrl}/api/fetch-live-sessions`)
        .then((response) => {
            response.data.items.forEach(async (session) => {
                getParseComment(session);
            })
        });
}
setTimeout(await getActiveLiveSession, 10000);
