const path = require('path');

exports.mapUrl = ({ suffix, req }) => {
    var protocol = req.connection.encrypted ? 'https' : 'http';
    return protocol + "://" + req.headers.host + '/' + suffix;
}