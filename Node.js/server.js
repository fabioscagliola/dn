var net = require('net');

var PORT = 65535;

var server = net.createServer();

server.on('connection', function (connection) {

    connection.on('data', function (data) {

        console.log('[server] client said: "' + data.toString() + '"');

        var rx = null;
        var tx = null;

        try {

            rx = JSON.parse(data);

            switch (rx.kind) {
                case 'hi':
                    tx = {
                        kind: 'hi',
                        data: {
                            version: '0.0.1',
                        },
                    };
                    break;
                default:
                    tx = {
                        kind: 'error',
                        data: {
                            message: 'Invalid message kind!',
                        },
                    };
                    break;
            }

        }
        catch (e) {
            tx = {
                kind: 'error',
                data: {
                    message: e,
                },
            };
        }

        connection.write(JSON.stringify(tx));
    });

    connection.on('end', function () {
        console.log('[server] client ' + connection.remoteAddress + ' disconnected');
    });

    console.log('[server] client ' + connection.remoteAddress + ' connected');

    //var tx = {
    //    kind: 'hi',
    //    data: {
    //        version: '0.0.1',
    //    },
    //};

    //connection.write(JSON.stringify(tx));
});

server.listen(PORT, function () {
    console.log('[server] listening');
});

