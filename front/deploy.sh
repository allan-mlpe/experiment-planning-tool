#!/bin/sh -e

PCVT_FRONT_VERSION=v1
CONTAINER_NAME=pcvt-front

ng build --prod

docker rm -f ${CONTAINER_NAME} 

docker build -t pcvt-front:${PCVT_FRONT_VERSION} . --no-cache

docker run -d --net=host --restart=always --name=${CONTAINER_NAME} pcvt-front:${PCVT_FRONT_VERSION}

