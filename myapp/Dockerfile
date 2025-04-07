FROM openjdk:17-jdk-slim

WORKDIR /app

CMD ["sh", "-c", "./mvnw package -DskipTests && java -jar target/myapp-0.0.1-SNAPSHOT.jar"]