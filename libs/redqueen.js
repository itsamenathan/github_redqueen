var exports = module.exports = {};

var util       = require('util');
var request    = require('request');
var config     = GLOBAL.config;
var log        = require('logule').init(module);


exports.toIrc = function(msg, channel){
  var rq = config.redqueen;
  if (channel === null) { channel = "#rqtest"; }
  var postData = JSON.stringify({
      'message'  : msg,
      'channel'  : channel,
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
          log.info(util.inspect(response));
        }
      } 
  );
};


