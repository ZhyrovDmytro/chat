const moment = require('moment');

function formatMessage(user,  msg) {
    return {
        user,
        msg,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;
