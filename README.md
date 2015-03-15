# Summary
Nodejs script to send redqueen messages based on github hooks.

## Run
* ```node index.js /config/path```
* ```docker run -v $(pwd)/config.js:/config.js -p 127.0.0.1:9003:9003 -d --name="gitredqueen" gitredqueen --config /config.js```
