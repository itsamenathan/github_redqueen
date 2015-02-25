var restify      = require('restify');

function Server(){
  var server       = restify.createServer();
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());
  
  server.post('/', debugPrint);
  
  server.listen(9003, '');
  return server;

  function debugPrint(req, res, next){
    console.log(req.headers);
    console.log(req.params);
    res.send(200);
    return next();
  }

}

module.exports = (function() {
  var instance;
  if (typeof instance === 'undefined') {
    instance = new Server();
  }
  return instance;
}());
