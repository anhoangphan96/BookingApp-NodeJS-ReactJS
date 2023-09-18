# Travel Booking Website (MERN Stack)

## MongoDB - Express - React - Redux - NodeJS

MERN stack is intended to provide a starting point for building full-stack JavaScript applications, including dynamic web apps. The stack is made of MongoDB, Express, React, Redux, and NodeJS.

## Travel Booking Website

A Website to book accomodations for travelling. This website contains: Home page, Search page (included logic to check available room), Detail hotel page. Sign in/Sign up/ Log out action in Client Page. Regarding Admin page, user can manage list of transactions, Create/Edit/Delete Hotels and Rooms, manage the role of users. The demo apps was deployed on Render and Firebase.

## Demo

\*Note: Please open link back-end first.

- Back-end demo (Render) : [Link](#)
- Client app (Firebase) : [Link](#)
- Admin demo (Firebase) : [Link](#)

- Client-role Account: `username: labi89` , `password: asdasd`
- Admin-role Account: `username: alan96` , `password: asdasd`

## Project Breakdown

### API Server

- Directory: server
- Features:
  - [x] Building api server (MVC model) - CRUD operations
  - [x] Generating schema models
  - [x] Session-cookie to store data login user.
  - [x] Authenticating based on user role.
  - [x] Connect and manage data on MongoDB

### Client App

- Directory: client
- Features:

  - [x] Developing Login/Sign up page
  - [x] Home page, Search page, Detail product page
  - [x] Search page was build on logic to check available room based on date range input, amount of people.
  - [x] Redux/Redux Toolkit to store some
  - [x] React-router
  - [x] See history of transactions

### Admin App

- Directory: admin
- Features:
  - [x] Login page - authenticate role admin.
  - [x] Dash-board to summarize data.
  - [x] Create/Update/Delete Hotel, Room
  - [x] Show all transactions on system
  - [x] User Page - manage and set role for user

### Clone or download the `Booking App` Respository

#### Prerequisites

- MongoDB
- NodeJS
- npm

\*Note:you need client, admin and server runs concurrently in different terminal session, in order to make them talk to each other and avoid comflict

**Make sure you set all variable related to url to localhost on .env file **

#### Client-side usage(PORT: 3000)

url: http://localhost:3000
change backend url to http://localhost:5000 in .env file

```
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm start       // run it locally
```

#### Admin usage(PORT: 3001)

url: http://localhost:3001
change backend url to http://localhost:5000 in .env file

```
$ cd admin
$ yarn # or npm i    // npm install packages
$ npm start       // run it locally
```

#### Server-side usage(PORT: 5000)

url: http://localhost:5000
adjust config of session in index.js follow the code below:

```
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // thời gian sống của cookie do session gửi trả client-side là 30 ngày
    },
  })
);
```

Finally, run the server like the some steps below

```
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start // run it locally
```
