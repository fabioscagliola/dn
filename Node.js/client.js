var net = require('net');

var PORT = 65535;

var client = net.connect({ host: "127.0.0.1", port: PORT, });

client.on('connect', function () {

    console.log('[client] connected');

    var tx = {
        kind: 'hi',
        data: {
            version: '0.0.1',
        },
    };

    client.write(JSON.stringify(tx));
});

client.on('data', function (data) {

    console.log('[client] server said: "' + data.toString() + '"');

    client.end();

});

client.on('end', function () {

    console.log('[client] disconnected');

});

