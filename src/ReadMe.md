# AdoptMe -> Imagen Dockerhub

Link del proyecto en DockerHub: https://hub.docker.com/r/damilakes/adoptme/tags

## Pasos para Usar la imagen del Proyecto

1. Para descargar la Imagen del Proyecto escribir y ejecutar en la terminal el siguiente comando: 
docker pull damilakes/adoptme:v1

2. Para ejecutar la imagen del proyecto escribir y ejecutar en la terminal el siguiente comando:
docker run -d --name adoptme -p 8080:80 damilakes/adoptme:v1

3. Para detener la ejecución del proyecto escribir y ejecutar en la terminal el siguiente comando:
docker stop adoptme
