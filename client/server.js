import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        if (pathname.startsWith('/admin')) {
            // Redirect to admin dashboard
            res.writeHead(307, { Location: `http://localhost:3000${pathname}` });
            res.end();
        } else {
            // Handle all other routes normally
            handle(req, res, parsedUrl);
        }
    }).listen(3001, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3001');
    });
});