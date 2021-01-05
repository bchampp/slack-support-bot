import {getQueryTicket} from './util/ticket-processor-util';
import {getMessages, postInThread} from './util/slack-util';

const channel = "general";
const responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};
let successful_response: any = {
    statusCode: 200,
    headers: responseHeaders,
};
let failed_response: any = {
    statusCode: 400,
    headers: responseHeaders,
};

// Endpoint called from client to post a message on behalf of the client to a given thread
export async function post(event, context, callback) {
    if (!event.body) {
        console.log("Please provide a body with thread and message");
        failed_response.body = JSON.stringify({message: 'Thread or message not provided in request',}, null, 2);
        callback(null, failed_response);
    }
    const data = JSON.parse(event.body);

    await postInThread("channel", data.message, data.ticketId);

    successful_response.body = JSON.stringify({message: 'Posting message in thread',}, null, 2);
    callback(null, successful_response);
}

// Endpoint to get an array of all messages in a thread
export async function get(event, context, callback) {
    if (!event.body) {
        console.log("Please provide a body with ticketId");

        failed_response.body = JSON.stringify({message: 'Thread not provided in request',}, null, 2);
        callback(null, failed_response);
    }
    const data = JSON.parse(event.body);

    const ticketItem = await getQueryTicket(data.ticketId, data.firmId);

    const messages = await getMessages(channel, ticketItem.slackThreadId);

    successful_response.body = JSON.stringify({message: 'Getting recent messages', conversation: messages}, null, 2);
    callback(null, successful_response);
}
