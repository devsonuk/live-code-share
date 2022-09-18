var moment = require('moment');

function getFormattedMessage(username, avatar,text){
    return {
        username,
        avatar,
        text,
        time: moment().format("hh:mm a")
    };
}

module.exports = getFormattedMessage;