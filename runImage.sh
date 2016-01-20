docker pull buildup/backend:test
export PATH=$PATH:/opt/local/bin
docker rm -fv $(docker ps  | grep build | awk '{print $1}')
docker run -d -h buildup --name buildup -p ${HOST_HTTPS_PORT}:443 -p ${HOST_HTTP_PORT}:80 buildup/backend:test
