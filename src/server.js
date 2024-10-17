const express = require('express');
const cors = require('cors');
const path = require('path');

const NodeMediaServer = require('node-media-server');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3018);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('index');
})

// configuracion del servidor RTMP
const nms = new NodeMediaServer({
    rtmp: {
        port: 1935,
        chunk_size: 3000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
});


// Evento cuando se recibe el flujo RTMP
nms.on('prePublish', (id, StreamPath, args) => {
    const stream_url = `rtmp://localhost${StreamPath}`
    console.log(`Flujo recibido: ${stream_url}`);
});

nms.run();

module.exports = app;