var github     = require('./github.js');
var rq         = require('./redqueen.js');
var server     = require('./server.js');
var gitio      = require('gitio2');
var format     = require("string-template");

server.post('/github/:channel', github.request);

github.on('push', function(req){
  console.log(req.params);

  var push   = req.params;

  gitio(push.compare, function(err, shorturl){
    var msg;
    if ( push.commits.length > 1 ) {
      msg = format("Detected {changes} changes to {repo} from user {user}.  Latest Reason: '{commitmsg}' - {url}", {
                   changes   : push.commits.length,
                   repo      : push.repository.full_name,
                   user      : push.pusher.name,
                   commitmsg : push.head_commit.message,
                   url       : shorturl
                   });
    }
    else {
      msg = format("Detected change to {repo} from user {user}.  Reason: '{commitmsg}' - {url}", {
                   repo      : push.repository.full_name,
                   user      : push.pusher.name,
                   commitmsg : push.head_commit.message,
                   url       : shorturl
                   });
    }
    console.log(msg);
    rq.toIrc(msg, push.channel);
  });
});

github.on('ping', function(req){
  var ping = req.params;
  var msg = format("Now monitoring {repo} for changes.",{
                   repo : ping.repository.full_name
                   });
  console.log(msg);
  rq.toIrc(msg, ping.channel);
});

