# react-strapi-mongo

This little project is made with ReactJS, Strapi API and Mongo DB.

It allow to manage some videos in the strapi admin dashboard, play and edit them in the frontend.


## How to start ?

First of all, clone the repository.

### Classic way

You need NodeJs version 16.x and a MongoDB server launched. It's preferable to use Yarn package manager.

Install dependencies and launch the api :

```bash
cd api
yarn install
yarn start
```

In an other terminal, install dependencies and launch the frontend :
```bash
cd frontend
yarn install
yarn start
```
And that's it !


### Docker

**You need [Docker](https://www.docker.com/) installed on your computer.**

Launch docker

```bash
docker-compose up
```

If you want to rebuild the images
```bash
docker-compose up --build
```

## What's next ?

At the first build, some datas will be populated into the database.

The strapi api will be accessible on http://localhost:1337

The frontend will be accessible on http://localhost:3000

**On the strapi API, create your first administrator, and start adding some videos.**

*For videos url, you can use Youtube, Dailymotion, or some remote accessible mp4 videos.*
