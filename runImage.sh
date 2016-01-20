docker pull buildup/backend:test
export PATH=$PATH:/opt/local/bin
docker rm -fv $(docker ps  | grep buildup-backend | awk '{print $1}')
docker run -d -h buildup-backend --name buildup-backend -p ${HOST_HTTPS_PORT}:443 -p ${HOST_HTTP_PORT}:80 -v ${HOST_SSL_SITE_CONFIG}:/etc/apache2/sites-enabled/default-ssl -v ${HOST_SSL_CERT}:/etc/ssl/certs/buildup-test.pem -v ${HOST_SSL_CERT_KEY}:/etc/ssl/private/buildup-test.key  buildup/backend:test
