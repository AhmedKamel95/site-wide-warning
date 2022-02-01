# Site Wide Warning Project

Welcome to your Litebulb coding challenge!

Throughout this project, if you have any concerns or questions regarding the logistics or technical specifications of this coding challenge, please directly email support@litebulb.io. Otherwise, please reach out to your recruiter.

## Background
All web applications experience catastrophic failures at some point or another. For example, if the "Post" feature suddenly stopped working on Facebook, that's considered a catastrophic failure, and users should get some kind of a warning or notification that their posts might not get successfully created. This could either happen automatically, or administrators of Facebook should have access to an admin console where they can choose to broadcast a warning to all users of Facebook that are being affected.

## Stack
**Database**: MongoDB

**Web Server**: Node.js, Express.js, Apollo Server, Mongoose.js

**Web App Client**: React.js, Recoil.js, Apollo Client

## Setup
To save you time, the entire dev environment is Dockerized for you. To access your dev environment:
1. Open a Github Codespace for this repo, select the smallest container specs available.
<p align="left">
  <img src="https://docs.github.com/assets/cb-244965/images/help/codespaces/new-codespace-button.png" width="250">
</p>

2. Once the Codespace container is launched, open a terminal and run:
```
make
```

This will spin up an empty MongoDB instance, the server, and the client.

3. Once it's complete, you can access your GraphQL playground at [https://site-wide-warning.loca.lt/](https://site-wide-warning.loca.lt/), and your React app at the Local Address for what's being forwarded at port 3000 in the PORTS window.

3. Seed your DB with at least 2 users.
4. Your dev environment is now ready! 🚀 Go to the Issues tab to begin your assigned tasks.

## Seed Users Data
To run a user creation mutation call, include this in the main query window in [https://site-wide-warning.loca.lt/](https://site-wide-warning.loca.lt/):
```
mutation CreateUser($user: CreateOneUserInput!){
  userCreateOne(record: $user) {
    record {
      firstName
      lastName
      email
    }
  }
}
```

Then, add user details in the Query Variables window:
```
{
  "user": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john@smith.com"
  }
}
```

The response should look something like: 
```
{
  "data": {
    "userCreateOne": {
      "record": {
        "firstName": "John",
        "lastName": "Smith",
        "email": "john@smith.com"
      }
    }
  }
}
```

Now, when you run a query to get users:
```
query {
  userCount
  userMany(limit: 10) {
    firstName
    lastName
    email
  }
}
```

you should see a response that looks like:
```
{
  "data": {
    "userCount": 1,
    "userMany": [
      {
        "firstName": "John",
        "lastName": "Smith",
        "email": "john@smith.com"
      }
    ]
  }
}
```


## Submission
Prior to submission, ensure that `npm run lint` and `npm run test` don't produce any warnings or errors.

Your final submission should be in the form of a pull request from a remote branch against `main`. Once you're ready to submit, open the Pull Request, add `litebulb-skills-bot` as a reviewer, and document your changes and thought processes in the Pull Request description.

## Resources

Node.js: https://nodejs.org/en/

Express.js: https://expressjs.com/

Apollo Server: https://www.apollographql.com/docs/apollo-server/

MongoDB: https://docs.mongodb.com/manual/introduction/

Mongoose: https://mongoosejs.com/docs/

React Hooks: https://reactjs.org/docs/hooks-intro.html

Recoil.js: https://recoiljs.org/

Apollo Client: https://www.apollographql.com/docs/react/
