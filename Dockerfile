FROM node:0.10

RUN cd /tmp && \
    wget --quiet https://github.com/itsamenathan/github_redqueen/archive/master.tar.gz -O github_redqueen.tar.gz && \
    tar -zxf github_redqueen.tar.gz && \
    rm -rf github_redqueen.tar.gz && \
    cd github_redqueen-master && \
    npm install

WORKDIR /tmp/github_redqueen-master
ENTRYPOINT ["node", "index.js"]



