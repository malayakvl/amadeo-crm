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

// SELECT * FROM data.set_orders_from_live_sessions_messages(2, 100);
// SELECT * FROM data.delete_orders_from_live_sessions(2);
// SELECT * FROM data.set_live_sessions_messages_parcer_data(2, 100);

// SELECT
// id_cnt, live_sessions_id, product_id, product_configuration_id, configuration, item_buyers
// FROM data.get_orders_waiting_list(10, 0, NULL, '');
