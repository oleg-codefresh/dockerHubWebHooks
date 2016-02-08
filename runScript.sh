docker run  -p 7777:3000 -v /home/ec2-user/.docker:/root/.docker  -v /var/run/docker.sock:/var/run/docker.sock  -it buildup/deployer:master
