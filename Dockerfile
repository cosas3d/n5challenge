# Establecer la imagen base
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Establecer la imagen base para la etapa de ejecución
FROM nginx:1.19.0-alpine

# Copiar los archivos de construcción al servidor nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar el servidor nginx
CMD ["nginx", "-g", "daemon off;"]