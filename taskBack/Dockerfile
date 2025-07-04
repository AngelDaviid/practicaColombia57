# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto de la aplicación (usualmente 3000 para NestJS)
EXPOSE 3000

# Comando por defecto para iniciar el servidor NestJS en desarrollo
CMD ["npm", "run", "start:dev"]
