const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer(function(req, res) {
  if (req.url.startsWith('/graphql') || req.url.startsWith('/swagger')) {
    proxy.web(req, res, { target: 'http://localhost:5220' });
  } else {
    proxy.web(req, res, { target: 'http://localhost:5095' });
  }
});

server.listen(8000, () => {
  console.log('Proxy server listening on port 8000');
});
