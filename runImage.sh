docker pull buildup/backend:test
export PATH=$PATH:/opt/local/bin
docker rm -fv $(docker ps  | grep build | awk '{print $1}')
docker run --name buildup -p 1111:80 buildup/backend:test
