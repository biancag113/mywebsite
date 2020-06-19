# Node and NPM CheatSheet
By Ira Herman

---

## NPM Terminal Commands:

- `npm install package-name --save`
  - install a package and keep a record of it in package.json
  - NPM Version 5.0.0 and up automatically do a `--save`, no need to type it
  - Shortcut `npm i package-name`
- `npm install package-name -g`
  - install a package as a global terminal command
- `npm install`
  - read package.json file and install all listed dependencies
- `npm init`
  - initialize a directory with package.json file for saving dependencies


## Setting up a new Node/Express app:

- `mkdir name_of_your_express_app`
- `cd name_of_your_express_app`
- `touch server.js`
- `npm init`
- `npm i express ejs method-override`
- `mkdir views`
- Create your EJS files (index.ejs, show.ejs, etc) in the `views` folder of your project.

Example starter server.js file:

```js
// Load express:
const express = require("express");
const app = express();

// Set the web server port:
const port = 3000;

// Load methodOverride middleware so you can make delete, put, and
// patch requests from web pages:
const methodOverride = require("method-override");

// const items = [{ name: "Xylox", description: "An astronaut" }];
const items = [];

// Load body parser middleware:
app.use(express.urlencoded({ extended: false }));

// Load methodOverride as middleware to support ?_method=<METHOD> query strings:
app.use(methodOverride("_method"));

// Define one or more routes:

// NEW
app.get("/items/new", (req, res) => {
  res.render("new.ejs");
});

// EDIT
app.get("/items/:id/edit", (req, res) => {
  res.render("edit.ejs", {
    item: items[req.params.id],
    index: req.params.id
  });
});

// UPDATE
app.put("/items/:id", (req, res) => {
  items[req.params.id] = req.body;
  res.redirect("/items");
});

// SHOW
app.get("/items/:id", (req, res) => {
  res.render("show.ejs", { item: items[req.params.id] });
});

// DESTROY
app.delete("/items/:id", (req, res) => {
  items.splice(req.params.id, 1); //remove the item from the array
  res.redirect("/items"); //redirect to index page
});

// CREATE
app.post("/items/", (req, res) => {
  let index = items.push(req.body) - 1;
  res.redirect(`/items/${index}`);
});

// INDEX
app.get("/items/", (req, res) => {
  res.render("index.ejs", { items: items });
});

// WEB SERVER //
// Load up the express web server. IMPORTANT: Always do this at the end of your server.js:
app.listen(port, () => {
  console.log("listening on port", port);
});

```

### Views:
`views/index.ejs`

```html
<h1>Listing all items on the planet:</h1>

<% for (let i in items) { %>
<h2><%= items[i].name %></h2>
<p><%= items[i].description %></p>
<a href="/items/<%= i %>">Show this item</a> |
<a href="/items/<%= i %>/edit">Edit this item</a>
<form action="/items/<%= i %>?_method=DELETE" method="POST">
  <input type="submit" value="DELETE LIFEFORM">
</form>
<hr>
<% } %>

<p>
  <a href="/items/new">Add a new lifeform</a>
</p>
```
---

`views/show.ejs`

```html
<h1>Showing item <%= item.name %></h1>

<ul>
  <li><%= item.name %></li>
  <li><%= item.description %></li>
</ul>

<a href="/items">Back to index</a>
```
---

`views/new.ejs`

```html
<h1>Add a living thing for this planet:</h1>
<form action="/items" method="POST">
	<p>
	  <label for="name">Name:</label>
	  <input id="name" name="name" type="text">
	</p>
	<p>
	  <label for="description">Description:</label>
	  <input id="description" name="description" type="text">
	</p>
	<input type="submit" value="Create it!">
</form>
```
---

`views/edit.ejs`

```html
<h1>Edit a lifeform on this planet</h1>
<form action="/items/<%= index %>?_method=PUT" method="POST">

	<!--  NOTE: Thanks to the following `value` attribute trick, the form is pre-populated with the current values for this item :) -->
	<p>
	  <label for="name">Name:</label>
	  <input type="text" name="name" id="name" value="<%=item.name%>" />
	</p>
	<p>
	  <label for="description">Description:</label>
	  <input type="text" name="description" id="description" value="<%=item.description%>" />
	</p>


	<input type="submit" name="" value="Submit Changes" />
</form>
```

## To run your node/express app:

At the terminal run: `nodemon`

To stop the web server, `ctrl`+`c`
