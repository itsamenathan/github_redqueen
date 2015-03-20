var github     = require('./github.js');
var rq         = require('./redqueen.js');
var server     = require('./server.js');
var gitio      = require('gitio2');
var format     = require("string-template");
var log        = require('logule').init(module);


server.post('/:channel', github.request);

function sendmsg(msg, channel){
    log.info(msg);
    rq.toIrc(msg, p.channel);
}

github.on('push', function(req){
  console.log(req.params);

  var p   = req.params;

  gitio(p.compare, function(err, shorturl){
    var msg;
    if ( p.commits.length > 1 ) {
      msg = format("{repo} - {user} - '{commitmsg}' - ({changes} changes) - {url}",{
                   changes   : p.commits.length,
                   repo      : p.repository.full_name,
                   user      : p.pusher.name,
                   commitmsg : p.head_commit.message,
                   url       : shorturl
                   });
    }
    else {
      msg = format("{repo} - {user} - '{commitmsg}' - {url}",{
                   repo      : p.repository.full_name,
                   user      : p.pusher.name,
                   commitmsg : p.head_commit.message,
                   url       : shorturl
                   });
    }
  
    sendmsg(msg, p.channel);
  });
});

github.on('ping', function(req){
  var p = req.params;
  var msg = format("Now monitoring {repo} for changes.",{
                   repo : p.repository.full_name
                   });
  console.log(msg);
  rq.toIrc(msg, p.channel);
});

github.on('pull_request', function(req){
  var p   = req.params;

  msg = format("{repo} - {user} - 'Pull Request: {action}' - {url}",{
                   action    : p.action,
                   repo      : p.pull_request.user.login,
                   user      : p.sender.login,
                   url       : p.pull_request.url
  });

  sendmsg(msg, p.channel);
});

github.on('release', function(req){
  var p = req.params;
  gitio(p.release.url, function(err, shorturl){
    msg = format("{repo} - {user} - 'Released: {tag_name}' - {url}",{
                     repo      : p.repository.full_name,
                     user      : p.release.author.name,
                     tag_name  : p.release.tag_name,
                     url       : shorturl
    });

    sendmsg(msg, p.channel);
  });
});

