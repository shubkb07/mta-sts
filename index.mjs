// index.mjs
import { createServer } from 'node:http';
const server = createServer((req, res) => {
  console.log(req.url);
  if (req.url === '/well-known/mta-sts.txt') {
    const version = 'STSv1';
    const mode = 'enforce';
    const mx = [
      'aspmx.l.google.com',
      'alt1.aspmx.l.google.com',
      'alt2.aspmx.l.google.com',
      'alt3.aspmx.l.google.com',
      'alt4.aspmx.l.google.com'
    ];
    const max_age = 86400;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`version: ${version}
mode: ${mode}
${mx.map(entry => `mx: ${entry}`).join('\n')}
max_age: ${max_age}`);
  } else {
    res.writeHead(404);
    res.end();
  }
  
});
// starts a simple http server locally on port 3000
const port = process.env.PORT || 3000;
server.listen(port, '127.0.0.1', () => {
  console.log('Listening on ${port}');
});
