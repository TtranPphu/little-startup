FROM maven:3.9.4-eclipse-temurin-17 AS backend

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:resolve

COPY src ./src
RUN mvn clean package -DskipTests
