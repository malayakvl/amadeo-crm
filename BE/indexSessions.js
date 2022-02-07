import axios from "axios";

const getActiveComment = (data) => {
    console.log(`parsing comment for live video id ${data.id}`);
}

async function getActiveLiveSession() {
    // console.log('fetch live session');
    await axios('http://localhost:4000/api/fetch-active-sessions')
        .then((response) => {
            response.data.items.forEach(session => {
                getActiveComment(session);
            })
        });
}
setTimeout(await getActiveLiveSession, 10000);
