docker rm -fv $(docker ps  | grep buildup/backend | awk '{print $1}')
#docker rmi -f $(docker images | grep buildup/backend| awk '{print $3}')
docker pull buildup/backend:test
export PATH=$PATH:/opt/local/bin
#docker rm -fv $(docker ps  | grep build | awk '{print $1}')
export HOST_HTTPS_PORT=4433
export HOST_HTTP_PORT=8888
docker run -d -h buildup --name buildup -p ${HOST_HTTPS_PORT}:443 -p ${HOST_HTTP_PORT}:80 buildup/backend:test
