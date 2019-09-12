
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

  

## Deploy Google Cloud Run
* PRE-REQUISITE: install gcloud cli.

### Build and upload API Docker image to Google Cloud
Go to api folder and execute the following command: ```gcloud builds submit --tag gcr.io/${PROJECT_ID}/mninit-api``` where PROJECT_ID is the id of the proyecto in GC.

### Deploy API in Google Cloud Run
Execute the following command: ```gcloud beta run deploy --image gcr.io/${PROJECT_ID}/mninit-api --platform managed``` where PROJECT_ID is the id of the proyecto in GC.

### Get Google Cloud Run API URL
When API was deployed correctly, copy the URL to constant API_URL in app project: ```app/src/constants/index.js```

### Build and upload APP Docker image to Google Cloud
Go to api folder and execute the following command: ```gcloud builds submit --tag gcr.io/${PROJECT_ID}/mninit-app``` where PROJECT_ID is the id of the proyecto in GC.

### Deploy APP in Google Cloud Run
Execute the following command: ```gcloud beta run deploy --image gcr.io/${PROJECT_ID}/mninit-app --platform managed``` where PROJECT_ID is the id of the proyecto in GC.

## Featured

![alt text](https://media.licdn.com/dms/image/C560BAQHHSxwIKBLw5A/company-logo_200_200/0?e=2159024400&v=beta&t=DJq0gdbx0-cNlsbD5wpaPupffkeUuICjuj8xEseu0oU)

![alt text](https://objectcomputing.com/files/cache/b6955553c8620cc0a3aed4c21d0588f0_f2130.jpg)