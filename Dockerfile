FROM node:14.9

WORKDIR /app

COPY package*.json ./

# Configurar npm para ignorar los errores de SSL
RUN npm config set strict-ssl false

# Instalar dependencias
RUN npm install

COPY . .