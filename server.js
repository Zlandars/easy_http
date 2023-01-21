import http from 'http';
import {readdir, readFile, writeFile } from 'fs';
import cookie from "cookie";

const host = '127.0.0.1';
const port = 80;
const user = {
    id: 123,
    username: 'testuser',
    password: 'qwerty'
};
let cheker = {};

const requestListener = (req, res) => {
    if (req.url === '/auth') {
        if (req.method === 'POST'){
            let cookies = req.headers.cookie.split('; ')
            cookies.map(item => {
                let arr = item.split('=');
                cheker[arr[0]] = arr[1];
            })
            if (user.username == cheker.username && user.password == cheker.pass) {
                // Тот кто будет проверять (если таковые имеются), едва разобрался с этим...
                res.writeHead(302, "OK", {'Set-Cookie': [`userId=${user.id}; max_age=172800`,`authorized=true; max_age=172800`], 'Content-Type': 'text/plain', 'Location': '/post'})
                res.end()
            } else { 
                res.writeHead(400,"",{'Content-Type': 'text/plain; charset=utf-8'});
                res.end('Неверный логин или пароль')
            }
        } else return res.writeHead(404);
    }
    // if (req.url === '/get') {
    //     if (req.method === 'GET') {// Не прочитал задание все и сразу, поэтому без синхронного метода обошелся...
    //         readdir('./files', (err, data) => {
    //             if (err) {
    //                 res.writeHead(500);
    //                 res.end('Internal server error');
    //                 return;
    //             }
    //             res.writeHead(200);
    //             res.end(data.join(',\n'))
    //         });
    //         return;
    //     }
    //     res.writeHead(405)
    //     res.end('HTTP method not allowed')
    //     return;
    // }
    // if (req.url === '/delete') {
    //     console.log(req.method)
    //     if (req.method === 'DELETE') {
    //         res.writeHead(200);
    //         res.end('Success! Delete page!')
    //         return;
    //     }
    //     res.writeHead(405)
    //     res.end('HTTP method not allowed')
    //     return;
    // }
    if (req.url === '/post') {
        // let cookies = req.headers.cookie.split('; ');
        //     cookies.map(item => {
        //         let arr = item.split('=');
        //         cheker[arr[0]] = arr[1];
        //     })
        // if (cheker.authorized == 'true' && user.id == cheker.userId) {
            // const filename = req;
            // const content = 'test';
            // writeFile(`./files/${filename}.txt`, content, (err)=>{
            //     if(err) return res.writeHead(404, `Что-то пошло не так!!! ${err}`,{'Content-Type': 'text/plain; charset=utf-8'})
            //     console.log('File is created!');
            // })
        // }
        if (req.method === 'POST') {
            res.writeHead(200);
            res.end('Success! Post page!')
            return;
        }
        res.writeHead(405)
        res.end('HTTP method not allowed')
        return;
    }

    // if (req.url === '/redirect') {
    //     if (req.method === 'GET') {
    //         res.writeHead(301)
    //         res.end('Ресурс постоянно доступен по адресу /redirected')
    //     }
    // }
    (async ()=>{
        await readFile('./files/index.html', { encoding: 'utf8' }, (err,data)=>{
            if(err) return res.writeHead(404);
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.end(data)
        });

    })()
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is started on address: http://${host}:${port}`)
})