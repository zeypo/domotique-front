var gcm = require('node-gcm');

var message = new gcm.Message();

message.addData('key1', 'msg1');

var regIds = ['AIzaSyDJ6m4dTS5ja2FE1hjDpJh4a0MgMnGlDnI'];

// Set up the sender with you API key
var sender = new gcm.Sender('810805081537');

//Now the sender can be used to send messages
sender.send(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
});

sender.sendNoRetry(message, regIds, function (err, result) {
    if(err) console.error(err);
    else    console.log(result);
});
