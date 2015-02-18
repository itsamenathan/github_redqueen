var exports = module.exports = {};

var util       = require('util');
var request    = require('request');
var config     = require('./config');


exports.toIrc = function(msg){
  var rq = config.redqueen;
  if (!rq.enable) { return; }
  var postData = JSON.stringify({
      'message'  : msg,
      'channel'  : rq.channel,
      'isaction' : rq.isaction,
      'key'      : rq.key
  });

  request.post(
      { headers:{'Content-Type' : 'application/json'},
        url: rq.url,
        body: postData
      },
      function (error, response, body) {
        if (response.statusCode != '200'){ 
          console.log(util.inspect(response));
        }
      } 
  );
}


