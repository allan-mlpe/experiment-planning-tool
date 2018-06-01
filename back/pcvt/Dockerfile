FROM maven:3.5-alpine

ADD src /usr/app/src

ADD pom.xml /usr/app/

WORKDIR /usr/app/

RUN mvn clean install

CMD ["java", "-jar", "target/pcvt-1.0-SNAPSHOT.jar"]

#CMD ["mvn", "clean", "install", "exec:java"]
