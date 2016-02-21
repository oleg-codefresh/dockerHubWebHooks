FROM node
RUN mkdir -p  /opt/local/bin
ENV PATH=$PATH:/opt/local/bin
RUN curl -L https://github.com/docker/machine/releases/download/v0.4.1/docker-machine_linux-amd64 > /opt/local/bin/docker-machine && chmod +x /opt/local/bin/docker-machine
RUN curl -L https://github.com/docker/compose/releases/download/1.6.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
RUN curl -L https://get.docker.com/builds/Linux/x86_64/docker-1.8.3 > /opt/local/bin/docker && chmod +x /opt/local/bin/docker
RUN npm install  gulp
WORKDIR /src
COPY ./package.json package.json
COPY ./bower.json  bower.json
RUN echo '{ "allow_root": true }' > /root/.bowerrc
RUN npm install -g bower
RUN bower install
RUN npm install

COPY ./ /src



CMD ["./node_modules/.bin/gulp", "runapp"]
