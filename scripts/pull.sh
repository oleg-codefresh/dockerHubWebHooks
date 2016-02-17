
#eval $(docker-machine env dev1.9)
#docker login buildup builduppass
echo pulling $image:$tag
docker pull $image:$tag
echo other data
echo $?

#docker pull  $image:$tag
#echo $?
