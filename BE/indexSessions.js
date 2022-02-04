import axios from "axios";

const getActiveComment = (data) => {
    console.log(`parsing comment for live video id ${data.id}`);
    axios.post(`https://graph.facebook.com/v3.3/me/live_videos?status=LIVE_NOW&access_token=${data.auth_provider_access_token}`, {
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.response.data);
        });
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
