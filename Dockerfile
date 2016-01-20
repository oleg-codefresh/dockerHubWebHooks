FROM node
RUN mkdir -p  /opt/local/bin
ENV PATH=$PATH:/opt/local/bin
RUN curl -L https://github.com/docker/machine/releases/download/v0.4.1/docker-machine_linux-amd64 > /opt/local/bin/docker-machine && chmod +x /opt/local/bin/docker-machine
RUN curl -L https://github.com/docker/compose/releases/download/1.4.2/docker-compose-`uname -s`-`uname -m` > /opt/local/bin/docker-compose && chmod +x /opt/local/bin/docker-compose
RUN curl -L https://get.docker.com/builds/Linux/x86_64/docker-1.8.3 > /opt/local/bin/docker && chmod +x /opt/local/bin/docker

COPY ./package.json /src/package.json
RUN npm install
COPY ./ /src

WORKDIR /src
CMD ["node", "./bin/www" ]
