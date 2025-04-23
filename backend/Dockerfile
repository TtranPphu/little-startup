# Stage 1: Build
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
CMD ["mvn" ,"-s", ".m2/settings.xml", "clean", "package", "-DskipTests"]

# Stage 2: Run
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/backend.jar .
CMD ["java", "-jar", "backend.jar"]
