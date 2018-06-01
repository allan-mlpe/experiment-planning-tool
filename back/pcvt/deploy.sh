#!/bin/sh -e

API_VERSION="v1"

CONTAINER_NAME="pcvt-api"

docker rm -f ${CONTAINER_NAME}

docker build -t pcvt-back:${API_VERSION} .

docker run -d --net=host --restart=always --name=${CONTAINER_NAME} pcvt-back:${API_VERSION}
