# Usa una imagen base oficial de Node.js para construir la aplicación
FROM node:20.11.1 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build --prod

# Usa una imagen base de nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /usr/src/app/dist/ecommerce /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
