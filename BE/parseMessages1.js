import 'dotenv/config';
import axios from 'axios';
import {setTimeout} from 'timers/promises';


const apiUrl = process.env.API_URL;


const getParseComment = (data) => {
    console.log(`parsing comment for live video id ${data.id}`);
    // axios(`${apiUrl}/api/parse-live-messages?sessionId=${data.id}`)
    //     .then((response) => {
    //         console.log(response.data.message);
    //         // response.data.items.forEach(session => {
    //         //     getActiveComment(session);
    //         // })
    //     });
}



async function getActiveLiveSession() {
    console.log(`${apiUrl}/api/fetch-live-sessions`);
    await axios(`${process.env.API_UR}/api/fetch-live-sessions`)
        .then((response) => {
            response.data.items.forEach(async (session) => {
                await getParseComment(session);
            });
        }).catch(e => {
            console.log(e.message);
        });
}
async function newStyleDelay() {
    await setTimeout(5000);
    await getActiveLiveSession();
}
newStyleDelay();


