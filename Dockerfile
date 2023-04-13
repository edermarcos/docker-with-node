# Imagen base de Node.js
FROM node:18.14-alpine

# Directorio de trabajo
WORKDIR /app

# Copiar el package.json y el package-lock.json a la imagen
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de archivos a la imagen
COPY . .

# Puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD [ "npm", "run", "dev" ]
