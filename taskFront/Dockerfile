# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios primero (esto ayuda al cacheo)
COPY package*.json ./

# Instala dependencias excluyendo opcionales (para evitar bugs como el de rollup)
RUN npm install --omit=optional

# Copia el resto del proyecto
COPY . .

# Expone el puerto que usa Vite (usualmente 5173, pero tú tienes 5174 configurado)
EXPOSE 5174

# Comando por defecto
CMD ["npm", "run", "dev", "--", "--host"]
