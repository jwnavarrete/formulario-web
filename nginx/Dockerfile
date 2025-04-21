FROM nginx:latest

# Instala vim
RUN apt-get update && apt-get install -y vim

# Copia los archivos de tu aplicación
# COPY ../dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY /root/workspace/jnavarrete/formularioonline/frontend/dist /usr/share/nginx/html

# Exponer el puerto 80
# EXPOSE 80