# Back-end Hello World

## Project 3 Back End

For Project 3, you will need CRUD functionality with a database, as well as some other back-end features. In this free-form lab, you will build out the necessary features, and test as you go.

>**Note:** Depending on your configuration, there will probably be steps missing here. Look at previous lessons for code examples but DO NOT copy-and-paste. Remember to test as often and as early as possible before moving on to further steps, and let `console.log` be your guide when in doubt.

>**Important:** Make sure you are NOT working on the `master` branch for any of this.  You should be working on `dev` or a branch like `steve` or `backend`, then you should create a Pull Request for the end of each section, where you merge into `master`.

## Set Up

Before you get started, make sure you have access to your group's Project 3 back-end repo.  Most likely, it currently only contains a `README` file.  Follow the steps below to get set up.

- Make sure you are a Contributor to this project, and you can `push` and `pull` changes
- Clone the back-end repo into your work folder for SEI
- Navigate to the repo's folder in Terminal, and change to your own branch (not `master`)
- Create a `.gitignore` file and add `.env` and `node_modules` to it
- Make a `server.js` file
- `init`ialize the repo with `npm`
- Install `express`, `mongoose`, `dotenv`, and `cors` with `npm`

>**Commit:** Commit this work with a message like "initializing backend".

## Get Server Running

Next, build a simple server that can respond to a request to home (`'/'`):

- `require` all four libraries that you just installed with `npm`
- Create an `app` variable
- Create a `.get` route that just `send`s "Hello World" back as a response
- Listen on port 3003
- Start your server
- Test that you can see this "Hello World" in the browser

>**Commit:** Commit this work with a message like "server up and running".

## Get Local DB Hello World

Next, build out your `mongoose` setup:

- Add all `mongoose` connection functions to `server.js`
- Create a `Schema` for your main CRUD model
- Create a `Model` for your main CRUD model
- Create a `controller` for your main CRUD model
- Make sure all files are connected properly
- Add a CREATE `.post` route in your `controller` that `create`s a new object in your DB, using your new model
- Test this route with Postman or `curl`
- Add an INDEX `.get` route in your `controller` that `find`s all documents in your new collection and responds with a `.json` array
- Test this route with Postman or in your browser

>**Commit:** Commit this work with a message like "DB Hello World".

## Get Back-end Ready for Production

Next, build out your Heroku setup:

- Add the variable `PORT=3003` to `.env` and edit your `app.listen` to use `process.env.PORT`
- Add the variable `MONGODB_URI=`(whatever the connection URI is - begins with `mongodb:` and ends in your DB name)
- `heroku create` and set a relevant name for your backend (probably just the name of your app idea)
- Add `mLab` to your Heroku configuration

>**Commit:** Commit this work with a message like "Heroku Set Up".

- Make sure you push your latest changes to `heroku` as well as `origin`
- Test your CREATE route with your Heroku URL on Postman
- Test your INDEX route with your Heroku URL on Postman or in your browser

>**Hint:** `heroku logs` are incredibly useful if you're troubleshooting issues with your Heroku back-end.

## Hungry for More

Done early? Try adding the following features which shouldn't require your other group members to finish.

- Hello World with your 3rd Party API
- Test the back-end portion of your authentication flow
- Keep building out the rest of your CRUD functionality
- When your front-end teammate completes the deployment step, add `cors` configuration to your app (it must whitelist `localhost:3000` and the URL that they send you)
