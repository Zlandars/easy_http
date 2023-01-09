const http = require('http');
const host = 'localhost';
const port = 3000;

const requestListener = (req,res) => {
    res.writeHead(200);
    res.end('Server is started!')
}

const server = http.createServer(requestListener);

server.listen(port, host, ()=>{
    console.log(`Server is started on address: http://${host}:${port}`)
})