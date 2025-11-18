# ------------------------------------
# FASE 1: Construcción (Compila la app)
# ------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY . .
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build 

EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
CMD ["sh", "-c", "serve -s build -p $PORT"]