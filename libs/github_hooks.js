var github     = require('./github.js');
var rq         = require('./redqueen.js');
var server     = require('./server.js');
var gitio      = require('gitio2');
var format     = require("string-template");

server.post('/:channel', github.request);

github.on('push', function(req){
  console.log(req.params);

  var push   = req.params;

  gitio(push.compare, function(err, shorturl){
    var msg;
    if ( push.commits.length > 1 ) {
      msg = format("{repo} - {user} - '{commitmsg}' - ({changes} changes) - {url}",{
                   changes   : push.commits.length,
                   repo      : push.repository.full_name,
                   user      : push.pusher.name,
                   commitmsg : push.head_commit.message,
                   url       : shorturl
                   });
    }
    else {
      msg = format("{repo} - {user} - '{commitmsg}' - {url}",{
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

github.on('pull_request', function(req){
  var pr   = req.params;
  // 
  msg = format("{repo} - {user} - '{commitmsg}' - {url}",{
                   action    : pr.action,
                   repo      : pr.pull_request.user.login,
                   user      : pr.sender.login,
                   url       : pr.pull_request.url
  });
});
