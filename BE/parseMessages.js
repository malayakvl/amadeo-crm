import axios from "axios";

const getParseComment = (data) => {
    console.log(`parsing comment for live video id ${data.id}`);
    axios(`http://localhost:4000/api/parse-live-messages?sessionId=${data.id}`)
        .then((response) => {
            console.log(response.data.message);
            // response.data.items.forEach(session => {
            //     getActiveComment(session);
            // })
        });
}



async function getActiveLiveSession() {
    await axios('http://localhost:4000/api/fetch-live-sessions')
        .then((response) => {
            response.data.items.forEach(session => {
                getParseComment(session);
            })
        });
    // await axios('http://localhost:4000/api/parse-live-messages')
    //     .then((response) => {
    //         console.log(response.data.message);
    //         // response.data.items.forEach(session => {
    //         //     getActiveComment(session);
    //         // })
    //     });
}
setTimeout(await getActiveLiveSession, 10000);
