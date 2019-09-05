# Micronaut Initializr

Web interface to generate Micronaut Framework project quickly and easyly.

To find out more details, visit readmes of the modules:

API settings: api/README.md  
APP settings: app/README.md

## Authors

Developed by Miguel Ángel Quintanilla and Francisco Javier Delgado Vallano, [Profile Software Services](https://www.profile.es) developers.

## Run with Docker
### Build images
API: ```docker build mninit-api .```
APP: ```docker build mninit-app .```
### Create network
```docker network create --driver bridge mninit_network```
### Run Containers
API: ```docker run --network mninit_network -d -p 5000:5000 --name=mninit-api mninit-api```
API: ```docker run --network mninit_network -d -p 8080:80 --name=mninit-app mninit-app```

## Featured
![alt text](https://media.licdn.com/dms/image/C560BAQHHSxwIKBLw5A/company-logo_200_200/0?e=2159024400&v=beta&t=DJq0gdbx0-cNlsbD5wpaPupffkeUuICjuj8xEseu0oU)
![alt text](https://objectcomputing.com/files/cache/b6955553c8620cc0a3aed4c21d0588f0_f2130.jpg)