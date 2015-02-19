module.exports = function(github){
  var restify      = require('restify');
  var server       = restify.createServer();
  
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.bodyParser());
  
  server.post('/', github.fromGithub);
  
  server.listen(9003, '');
};

