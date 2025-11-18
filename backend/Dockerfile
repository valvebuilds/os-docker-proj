# ------------------------------------
# FASE 1: Construcción (Genera dependencias)
# ------------------------------------
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de paquetes
# Nota: Los archivos se copian desde el directorio ./backend (el contexto de la construcción)
COPY package*.json ./

# Instala dependencias de producción
# Esto se hace en una capa separada para aprovechar el cache de Docker
RUN npm install 
#--only=production

# Copia el resto del código fuente (todo lo que está en ./backend)
COPY ./backend /usr/src/app/backend 

# ------------------------------------
# FASE 2: Producción (Contenedor final, ligero)
# ------------------------------------
FROM node:20-alpine

# Establece el directorio de trabajo final
WORKDIR /usr/src/app/backend

# Copia las dependencias de la fase 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copia el código fuente
COPY --from=builder /usr/src/app/backend .

# Expone el puerto que usa el servidor Node.js
EXPOSE 5001

# Comando para iniciar la aplicación (Ajusta el nombre del archivo si usas 'index.js', etc.)
CMD ["node", "server.js"]