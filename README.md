# Litebulb Site Wide Warning Project (Full Stack Engineering Track)

Welcome to the next step of your interview, the Litebulb coding project! This project will give you an accurate overview of some of the real work you will be doing on the job. You'll need to set up your own development environment, write code in an existing codebase, and follow as many existing best practices and production expectations as you can. You will have 48 hours until this project expires, though the actual work will take you anywhere between 30 minutes to a few hours, depending on your existing expertise of the stack. You are allowed to use any materials you see fit to educate yourself on the technologies used in this project, **except** for plagiarising direct solutions of this project.

Throughout your project, if you have any questions, concerns, or issues, please directly email support@litebulb.io and we will get back to you within 2 hours.

## Background
In many mature, production user-facing web applications, there are scenarios in which a major feature of the product experiences a catastrophic failure. For example, if the "Post" feature suddenly stopped working on Facebook, that's considered a catastrophic failure, and users should get some kind of a warning or notification that their posts might not get successfully created. This could either happen automatically, or administrators of Facebook should have access to an admin console where they can choose to broadcast a warning to all users of Facebook that are being affected.

## Requirements
For this project, you will be building the Site-Wide Warning bar for an existing shell web app, along with an admin console for administrators of the app to be able to turn warnings on and off or change them as necessary. You will be building this project with modern React using Recoil for state management and Apollo GraphQL Client for server communication. Please reference the prototyped mock ups at [this Figma link](https://www.figma.com/file/P7y76UxSB1EfhB3ZyhcEfM/Litebulb-Site-Wide-Warning-Project?node-id=1%3A2) to get an understanding of how the interaction should work on completion.

To persist state server-side, you will need to make updates to the server, which is a Node.js server running Express, serving GraphQL endpoints via Apollo, and using Mongoose to interact with your local MongoDB instance. This project already includes a User schema and Query + Mutation endpoints for the User model, which you can use as an example. You will be building server-side GraphQL schema(s) and endpoints that enable the Litebulb web app to start, update, and mitigate site wide warnings.

A user must be able to dismiss the current ongoing warning. If a warning is updated to a different type, the user should see the new warning. Similarly, if a user dismissed the current warning, but it's ended, and a new warning starts, they should see the new warning.

A warning consists of at least two fields:
```
type: SiteWideWarningType
label: String
```
There are three types of warnings:
1. Download Server Unavailable Warning
2. Upload Server Unavailable Warning
3. Data Inconsistency Warning
Each type of warning has it's own hardcoded label which you can find in the Figma link attached above.

**Note**: No more than one Site Wide Warning can be ongoing at the same time.

Steps:
1. Set up and run your local Mongo database, Node server, and React client. Refer to the set up instructions below.
2. Seed your database with a few users first. This is necessary to test that user-level warning dismissal. Refer to the data seeding instructions below.
3. Build your solution in React.
4. Log key events (ie: warning created, warning dismissed, etc) using the provided logger util. The more thorough your logs are, the better.
5. Write some Jest tests for the features you built. The more thorough your tests are, the better.

You are allowed to edit, remove, or add any file in this repository to complete the project.

## Set up Node server on Mac/Linux

To begin setting up this app, you'll need to install each of these tools on your machine:
1. [Brew](https://brew.sh/)
2. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3. [Node.js + NPM](https://www.npmjs.com/get-npm)
4. [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

After you've cloned the repo locally, in one terminal shell, run:
### `brew services start mongodb-community@4.4`
Note: the MongoDB version might be different for you

This runs a local instance of MongoDB on your machine at [mongodb://127.0.0.1:27017](mongodb://127.0.0.1:27017). Note, if your instance of MongoDB is running at a different address, please update the `MONGODB_URI` configuration in `.env` to match that address.

In a different terminal shell at this project's root directory, run:
```
cd server/
npm install
npm run dev
```

This runs a local instance of your Express Node.js server. The Apollo GraphiQL server's out-of-the-box IDE can be found at [http://localhost:8000](http://localhost:8000). All data created and fetched through this GraphQL server will be stored in your local MongoDB instance.

## Set up Node server on Windows

To begin setting up this server, you'll need to install each of these tools on your machine:
1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. [Node.js + NPM](https://www.npmjs.com/get-npm)
3. [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

### Installing and Running MongoDB on Windows
1. Download [this MongoDB installer](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
2. To run it, either go to the directory where it is installed and double click the .exe, or run the following in a shell with admin privileges:
```
C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe
```
You can create a shortcut for it or add it to your taskbar for easy access.

In a different terminal shell, go to the server directory of this project, and run:
```
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
### `npm install`

To run the app locally, run:
### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Submission
Prior to submission, ensure that `npm run lint` and `npm run test` don't produce any warnings or errors.

Your final submission should be in the form of a pull request from a remote branch against `main`. Once you're ready to submit, open the Pull Request, add `litebulb-skills-bot` as a reviewer, and document your changes and thought processes in the Pull Request description section. A template should already be present for you to fill out. Please allow up to a few days for your recruiter to get back to you on next steps.

## Resources

Node.js: https://nodejs.org/en/

Express.js: https://expressjs.com/

Apollo Server: https://www.apollographql.com/docs/apollo-server/

MongoDB: https://docs.mongodb.com/manual/introduction/

Mongoose: https://mongoosejs.com/docs/

React Hooks: https://reactjs.org/docs/hooks-intro.html

Recoil.js: https://recoiljs.org/

Apollo Client: https://www.apollographql.com/docs/react/
