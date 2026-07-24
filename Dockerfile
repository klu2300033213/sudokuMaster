# ===================================================================
# SUDOKU MASTER AI - RAILWAY MULTI-STAGE DOCKERFILE
# Developed by Gandham Bhanu Prakash
# ===================================================================

# --- Stage 1: Build React TypeScript Frontend ---
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Build Spring Boot Java Backend ---
FROM maven:3.9-eclipse-temurin-17-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml ./
COPY backend/src ./src
# Copy built static React assets into Spring Boot resources/static
COPY --from=frontend-builder /app/frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# --- Stage 3: Production Runtime Container ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/backend/target/*.jar app.jar

ENV PORT=8080
EXPOSE $PORT

ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
