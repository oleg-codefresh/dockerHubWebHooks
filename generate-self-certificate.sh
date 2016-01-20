#!/bin/sh
mkdir -p /root/buildup
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout /root/buildup/buildup-test.key -out /root/buildup/buildup-test.pem