
/**
 * Module dependencies.
 */

var cluster = require('../')
  , http = require('http');

var server = http.createServer(function(req, res){
  console.log('%s %s', req.method, req.url);
  var body = 'Hello World';
  res.writeHead(200, { 'Content-Length': body.length });
  res.end(body);
});

// custom repl function

cluster.repl.define('echo', function(master, sock, msg){
  sock.write(msg + '\n');
}, 'echo the given message');

// $ telnet localhots 8888

cluster(server)
  .use(cluster.logger('logs'))
  .use(cluster.stats())
  .use(cluster.repl(8888))
  .use(cluster.debug())
  .listen(3000);