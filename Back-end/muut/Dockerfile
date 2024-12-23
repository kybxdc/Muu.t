# Base image
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정
WORKDIR /app

# JAR 파일 복사
COPY build/libs/muut-0.0.1-SNAPSHOT.jar app.jar

# 포트 설정 (Spring Boot 기본 8080)
EXPOSE 9090

# JAR 파일 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
