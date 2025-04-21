#!/bin/bash
docker-compose -f docker-compose.prod.yml down

# Levanta el contenedor en modo detach
docker-compose -f docker-compose.prod.yml up --build

# Copia la carpeta dist del contenedor al host principal
cd ./nginx

docker-compose up -d --build

cd ..