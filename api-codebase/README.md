# HealthMiner

##Inspiration

The goal of this study, which was inspired by **behavioral science and digital therapy**, was to see if self-guided digital therapy based on **cognitive behavioral therapy** could be useful in the treatment of mental health and wellbeing issues. Similar studies have shown that such courses can be just as beneficial in the treatment of depression and anxiety.

![Inspiration](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/913/577/datas/original.png)

While there are some NFT projects that aim to empower individuals, the topic of mental health is rarely discussed in the Web3 community.

![Process](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/913/576/datas/original.png)

**Filecoin  powered and NFT driven solution ** helped us to create a community alongside our application, allowing us to grow with our users. This has the added benefit of promoting mental health awareness while also creating a secure environment for our consumers.

##What it does
Our emotions are always hidden and suppressed in mental health. We keep it so close to us that it eventually becomes oppressive and suffocating.

To ensure we don't miss proven patterns in the actual world, the solution addresses new ways of interacting in the metaverse, as well as the power of community and discovering connections.

**Health NFTs that have been NFT-fied** (1st drop), followed by hundreds of NFTS (2nd drop) Decentralized governance in which the community as a whole decides on the future of HealthMiner. 


• The service is hosted on blockchain and features a quick revelation of NFTs as well as reasonable mint restrictions. 

• **CBT is an evidence-based therapy** that helps people discover, assess, and reframe their ideas in order to enhance their mood. 

• On timely execution of stated tasks and milestone events, the end user is **rewarded with NFT tokens**.

##How we built it
We're incredibly thrilled to bring this to the community since it goes beyond appealing collectibles and reward tokens to enable future options for enjoyment and utility across the metaverse.

HealthMiner, a collection of NFTs that intends to gamify therapy, is poised to take the lead in this field in the world of NFTs.

Bringing a solution to the metaverse via NFT, which has a big potential to generate buzz in the NFT world.

Towards very Tech 4 good cause – putting innovative ways to interact through gamified NFT resulting multi-faceted capabilities

• awareness for everyone with emphasis on Wellness, thoughtfulness and mental health 
• interactions with challenged people where communication, language and making them speak up are barriers to absorb hidden information around mental health 
• strived to create a welcoming environment for those dealing with mental health struggles 
• Identified 6 key pillars (sleep, exercise, diet, mental resilience, relationships, purpose) important in improving mental health through gradual but sustainable change

![Gamified Multifaced Capabilities](https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/913/573/datas/original.png)

##Challenges we ran into
With so many variables in real-world circumstances, connecting such sensitive concerns to Tech 4 Good in order to make a change in society is difficult. We used design thinking and empathy dialogues to bring the best to end users in incremental increments.

The initial setup and exploration of Filecoin's API documentation took a little longer.

##Accomplishments that we're proud of

• Improving access to mental health solutions 
• Taking care of mental health through fun with components of Tech 4 good are all things we're proud of.

##What we learned
HealthMiner - Human-Centered Design-Driven Experience In the solution, HCD is at the heart of end-user navigation. HCD is a way of thinking that prioritizes the people we're attempting to help and other key stakeholders in the design, innovation, and implementation process. The HCD process is iterative, quantifiable, and results-oriented. 

• Work with stakeholders – whether end users or service providers – to build solutions and strategies that overcome issues and develop opportunities to produce value and impact.

##What's next for HealthMiner
HealthMiner's long-term goal is to become a global emblem of positive mental health.



## Commands

After you generate your project, these commands are available in `package.json`.

```bash
npm test # test using Jest
npm run coverage # test and open the coverage report in the browser
npm run lint # lint using ESLint
npm run dev # run the API in development mode
npm run prod # run the API in production mode
npm run docs # generate API docs
```

## Playing locally

First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance.

```bash
$ mongod
```

Then, run the server in development mode.

```bash
$ npm run dev
Express server listening on http://0.0.0.0:9000, in development mode
```

If you choose to generate the authentication API, you can start to play with it.
> Note that creating and authenticating users needs a master key (which is defined in the `.env` file)

Create a user (sign up):
```bash
curl -X POST http://0.0.0.0:9000/users -i -d "email=test@example.com&password=123456&access_token=MASTER_KEY_HERE"
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "id": "57d8160eabfa186c7887a8d3",
  "name": "test",
  "picture":"https://gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?d=identicon",
  "email": "test@example.com",
  "createdAt": "2016-09-13T15:06:54.633Z"
}
```

Authenticate the user (sign in):
```bash
curl -X POST http://0.0.0.0:9000/auth -i -u test@example.com:123456 -d "access_token=MASTER_KEY_HERE"
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "id": "57d8160eabfa186c7887a8d3",
    "name": "test",
    "picture": "https://gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?d=identicon",
    "email": "test@example.com",
    "createdAt":"2016-09-13T15:06:54.633Z"
  }
}
```

Now you can use the `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` token (it's usually greater than this) to call user protected APIs. For example, you can create a new `article` API using `yo rest:api` and make the `POST /articles` endpoint only accessible to authenticated users. Then, to create a new article you must pass the `access_token` parameter.
```bash
curl -X POST http://0.0.0.0:9000/articles -i -d "title=Awesome Article&content=Yeah Baby&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "id": "57d819bfabfa186c7887a8d6",
  "title": "Awesome Article",
  "content": "Yeah Baby",
  "createdAt": "2016-09-13T15:22:39.846Z",
  "updatedAt":"2016-09-13T15:22:39.846Z"
}
```

> Some endpoints are only accessible by admin users. To create an admin user, just pass the `role=admin` along to other data when calling `POST /users`.

## Deploy

Here is an example on how to deploy to [Heroku](https://heroku.com) using [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line):
```bash
# start a new local git repository
git init

# create a new heroku app
heroku apps:create my-new-app

# add heroku remote reference to the local repository
heroku git:remote --app my-new-app

# add the MongoLab addon to the heroku app
heroku addons:create mongolab

# set the environment variables to the heroku app (see the .env file in root directory)
heroku config:set MASTER_KEY=masterKey JWT_SECRET=jwtSecret

# commit and push the files
git add -A
git commit -m "Initial commit"
git push heroku master

# open the deployed app in the browser
heroku open
```

The second time you deploy, you just need to:

```bash
git add -A
git commit -m "Update code"
git push heroku master
```

## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ facebook/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ sendgrid/
│  └─ your-service/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/some-endpoint/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.
