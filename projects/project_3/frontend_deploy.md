# Front-End Deployment

## Project 3 Front End

Most likely, you do not have a repository for your front end, yet.  If you do, please ignore it for this lesson, and you can bring any material from that repository into the one you will create in this lab after we finish.

>**Important:** Make sure you are NOT working on the `master` branch for any of this.  You should be working on `dev` or a branch like `steve` or `frontend`, then you should create a Pull Request for the end of each section, where you merge into `master`.

## Set Up

Navigate to your SEI work folder, and we will create our front end there.

- `create-react-app <name-of-your-app>`
- Enter your app directory, and change to your own branch (not `master`)
- Change `App.js` to be a `class` component
- `npm start`
- Make sure the default CRA page (spinning atom and welcome message) show up in your browser

>**Commit:** Commit this work with a message like "initializing frontend".

## Deploy to GH Pages

- Create a new, **empty** GitHub repo (no `README`)
- Add this repository as your `origin` `remote`
- Go into `Settings` and enable GitHub Pages
- Copy the URL provided and store it somewhere safe (we will use it later)
- Install the `gh-pages` package with `npm`
- Add the following to your `package.json`

```
"homepage": "http://yourusername.github.io/your-app-name",
```

AND

```
"scripts": {
  //...
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

- Inside your application folder, run `npm run deploy`

>**Commit:** Commit this work with a message like "frontend built".

- Push your latest work up, and merge it with a Pull Request into `master`
- Go into `Settings` again, and scroll down to the GitHub Pages section
- Select the `gh-pages` branch option from the dropdown
- Wait a minute or two for the changes to update
- Click on the URL in the GitHub Pages section
- Make sure you see the spinning atom again
- Copy the URL, and send it to your lead back-end dev to add CORS support

## Off to the Races

Your frontend is now deployed! Now it's time to build it out. Start creating some components. Here are some ideas if you're not sure where to start:

- A `Signup` and `Login` component
- A component that will show all of your data (i.e. an `index` page)
- A component that will show one piece of your data (i.e. a `show` page)
- A component (likely a form) that will allow you to save new data
- A component (likely a form) that will allow you to update data

Whenever your lead backend dev or lead frontend dev is finished with their lab, start to connect them to your work from this lab (for lead backend dev, that means a hello world `create` or `index` with `fetch`; for lead frontend dev, that means adding front-end routing).

## Resources

- [A more detailed (and slightly different) approach](https://github.com/gitname/react-gh-pages)
