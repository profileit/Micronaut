
# Micronaut Initializr

  

Micronaut Initializr is a Web interface to generate Micronaut Framework projects quickly and easily.
  

To find out more details, visit each module readme file:
  

* API settings: api/README.md

* APP settings: app/README.md

  

## Authors

  

Developed by [Miguel Ángel Quintanilla](https://www.linkedin.com/in/miguel-%C3%A1ngel-quintanilla-758a5b120/) and [Francisco Javier Delgado Vallano](https://www.linkedin.com/in/francisco-javier-delgado-vallano-b28b1670/), [Profile Software Services](https://www.profile.es) developers.

  

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
When the API has been successfully deployed, copy the URL to constant API_URL in app project: ```app/src/constants/index.js```

### Build and upload APP Docker image to Google Cloud
Go to api folder and execute the following command: ```gcloud builds submit --tag gcr.io/${PROJECT_ID}/mninit-app``` where PROJECT_ID is the id of the proyecto in GC.

### Deploy APP in Google Cloud Run
Execute the following command: ```gcloud beta run deploy --image gcr.io/${PROJECT_ID}/mninit-app --platform managed``` where PROJECT_ID is the id of the proyecto in GC.

## Featured

<a href="https://profile.es/">
    <img src="app\src\profile-logo.png" width="200">
</a>
&nbsp;&nbsp;&nbsp;
<a href="">
    <img src="app\src\micronaut.png" width="300">
</a>

