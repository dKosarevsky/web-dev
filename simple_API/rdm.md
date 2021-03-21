
# FastAPI-Postgres-docker-compose
* FastAPI app
* PostgreSQL integration using SQLAlchemy
* Dockerfile and docker-compose integations

# How to run this with Docker?
* Make sure you have docker installed and runninng on your machine
* Open the terminal to the docker-compose path and hit the following command

```
docker-compose up --build
```

Or: \
`docker-compose build` to build the containers. \
`docker-compose up` to start the app. \
`docker-compose up -d` to start the app in detached mode. \
`docker-compose down` to stop the app.

Swagger - [http://0.0.0.0:8001/docs](http://0.0.0.0:8001/docs)

ReDoc - [http://0.0.0.0:8001/redoc](http://0.0.0.0:8001/redoc)
