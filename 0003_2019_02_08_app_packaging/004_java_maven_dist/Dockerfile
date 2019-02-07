FROM openjdk:11-jre-slim

COPY target/helloworld-1.0.0-SNAPSHOT-jar-with-dependencies.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]