import app from '../app'
import http from "http";

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
const server = http.createServer(app);
server.listen(port);


function normalizePort(val: string) {
    let currentPort = parseInt(val, 10);
    if (isNaN(currentPort)) { // named pipe
        return val;
    }
    if (currentPort >= 0) { // port number
        return currentPort;
    }
    return false;
}
