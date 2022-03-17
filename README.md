# Site Wide Warning

Throughout this interview, if you have any concerns or questions regarding the logistics or technical specifications of this coding challenge, please directly email support@litebulb.io. Otherwise, please reach out to your recruiter.

## Background
All web applications experience catastrophic failures at some point or another. For example, if the "Post" feature suddenly stopped working on Facebook, that's considered a catastrophic failure, and users should get some kind of a warning or notification that their posts might not get successfully created. This could either happen automatically, or administrators of Facebook should have access to an admin console where they can choose to broadcast a warning to all users of Facebook that are being affected.

## Stack
**Database**: MongoDB

**Web Server**: Node.js, Express.js, Apollo Server, Mongoose.js

**Web App Client**: React.js, Recoil.js, Apollo Client

## Set up Node server on Mac/Linux

To begin setting up this app, you'll need to install each of these tools on your machine:
1. [Brew](https://brew.sh/)
2. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3. [Node.js + NPM](https://www.npmjs.com/get-npm)
4. [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

After you've cloned the repo locally, in one terminal shell, run:
```
brew services start mongodb-community@4.4
```
Note: the MongoDB version might be different for you

This runs a local instance of MongoDB on your machine at [mongodb://127.0.0.1:27017](mongodb://127.0.0.1:27017). Note, if your instance of MongoDB is running at a different address, please update the `MONGODB_URI` configuration in `.env` to match that address.

In a different terminal shell at this project's root directory, run:
```
cd server/
npm install
npm run dev
```

This runs a local instance of your Express Node.js server. The Apollo GraphiQL server's out-of-the-box IDE can be found at [http://localhost:8000](http://localhost:8000). All data created and fetched through this GraphQL server will be stored in your local MongoDB instance.

## Seed Users Data
Before you begin building your solution, you'll need to create a couple (at least 2) users in your database first.
The User schema, Query, and Mutation endpoints have already been given to you.
To run a user creation mutation call, include this in the main query window in [http://localhost:8000](http://localhost:8000):
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

Then, add user details in the Query Variables window (you can use whatever name and email you want):
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
Now, when you open the app on the browser, click on the "Change Users" menu item in the top right, you should see the users you created in that list.

## Set up React client
To begin setting up, you'll need:
1. [Brew](https://brew.sh/) (only for Mac OS)
2. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3. [Node.js + NPM](https://www.npmjs.com/get-npm)

After you've cloned the repo locally, go to the root directory of the project, and run:
```
npm install
```

To run the app locally, run:
```
npm start
```

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


## Submission
Prior to submission, ensure that `npm run lint` and `npm run test` don't produce any warnings or errors.

Your final submission should be in the form of a pull request from a remote branch against `main`. Once you're ready to submit, open the Pull Request, and document your changes and thought processes in the Pull Request description.

When you're sure you're ready to submit, add `litebulb-skills-bot` as a reviewer. You will lose access to the repository, and your submission will be considered closed.

## Resources

Node.js: https://nodejs.org/en/

Express.js: https://expressjs.com/

Apollo Server: https://www.apollographql.com/docs/apollo-server/

MongoDB: https://docs.mongodb.com/manual/introduction/

Mongoose: https://mongoosejs.com/docs/

React Hooks: https://reactjs.org/docs/hooks-intro.html

Recoil.js: https://recoiljs.org/

Apollo Client: https://www.apollographql.com/docs/react/
