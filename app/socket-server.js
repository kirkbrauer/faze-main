module.exports = function(app) {
  var server = require('http').createServer(app);
  var io     = require('socket.io')(server);
  var redis  = require('redis');
  var redis_client = redis.createClient(); //creates a new client

  redis_client.on('connect', function() {
    console.log('Connected to redis');
  });

  /*io.on('connection', function(socket) {
    secret: 'your secret or public key',
    timeout: 15000 // 15 seconds to send the authentication message
    })).on('authenticated', function(socket) {
      //this socket is authenticated, we are good to handle more events from it.
      console.log('hello! ' + socket.decoded_token.name);
    });
  });*/

  console.log("Setup socket Server");

  // =======================================
  var key = new NodeRSA();
  key.generateKeyPair();
  console.log(key.exportKey('public'));
  console.log(key.exportKey('private'));
  console.log(key.getMaxMessageSize());
  var enc = key.encryptPrivate("Hello world", 'base64');
  console.log(enc);
  console.log(key.decryptPublic(enc, 'utf8'));
};
