CONTAINER_NAME="pcvt-database"
DB_USER="pcvtadmin"
DB_USER_PASSWORD="r00t"
DB_NAME="reviewer"
DB_LOCAL_DATA="/Users/allan/Documents/msc/data"

docker rm -f ${CONTAINER_NAME}

docker run -d --restart=always --name ${CONTAINER_NAME}  \
    -e POSTGRESQL_USER=${DB_USER} -e POSTGRESQL_PASSWORD=${DB_USER_PASSWORD} \
	-e POSTGRESQL_DATABASE=${DB_NAME} -p 5432:5432  -v ${DB_LOCAL_DATA}:/var/lib/pgsql/data centos/postgresql-96-centos7

sh deploy.sh