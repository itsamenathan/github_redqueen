FROM node:0.10
# https://github.com/RisingStack/docker-codeship-project

COPY . /src
RUN cd /src && npm install

EXPOSE 9003

WORKDIR /src
ENTRYPOINT ["node", "index.js"]

#RUN cd /tmp && \
#    wget --quiet https://github.com/itsamenathan/github_redqueen/archive/master.tar.gz -O github_redqueen.tar.gz && \
#    tar -zxf github_redqueen.tar.gz && \
#    rm -rf github_redqueen.tar.gz && \
#    cd github_redqueen-master && \
#    npm install
#WORKDIR /tmp/github_redqueen-master



