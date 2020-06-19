# Adding React Router to our app

In this exercise, we will:

- Wrap our app with a Router
- Break up our functionality into separate routes

### ✅ Step 1: BrowserRouter

- First, install react-router with `npm install react-router react-router-dom --save`

- Next, in `App.js`, import BrowserRouter at the top:

  `import { BrowserRouter } from 'react-router-dom'`

- At the bottom of the file, wrap the `App` component in a `BrowserRouter`:

```js
export default () => (
  <BrowserRouter>
    <App searchResults={searchResults} />
  </BrowserRouter>
)
```

> 🤔 Why not put the BrowserRouter at the top of the components rendered within `App`?

Our App component is stateful, so it is going to re-render its tree every time anew bookmark is added or removed. This means that our BrowserRouter would re-render as well. It probably wouldn't break anything, but it's always good to consider what will be re-rendered on state changes - and update our structure to avoid unnecessarily re-rendering components that don't need it.

### ✅ Step 2: Navigation

We are going to break up our Bookmarking app into three routes:

- A homepage, `/`
- A search results page, `/search`
- And a bookmarks page, `/bookmarks`

We'll put this navigation in our `Header` component. In `Header.js`:

- Import the `Link` component: `import { Link } from 'react-router-dom'`
- Wrap the text "React Bookmarks" with a `Link` that points to the base route:

  ```js
  <h1>
    <Link to="/">React Bookmarks</Link>
  </h1>
  ```

- Add three more links below the h1, one to `/search` and one to `/bookmarks`;

```js
<Link to="/search">Search Repos</Link>
<Link to="/bookmarks">My Bookmarks</Link>
<Link to="/about">About</Link>
```

Save your changes and take a look at the browser. When you click these nav links, you should see the URL change. (Your UI will still be the same)

### ✅ Step 3: Basic Routes using `component`

Now that we have our Links working, let's break up our app into some different routes.

First, we'll set up some simple ones:

- Create a new directory: `src/views`. Since we are going to have a few different views, this will help our directory stay organized.
- Within it, create four new files: `Homepage.js`, `About.js`, `Search.js` and `Bookmarks.js`.
- In these files, create new React components. They can be Function or Class components.
  - In `Homepage.js`, just return the text "This is the homepage" within a `<p>` tag.
  - In `About.js`, return "This is the about page" within a `<p>` tag.
  - In the other two files, just have them return `null` for the moment.

While we're at it, let's organize our reusable components into their own directory:

- Create `src/components` and move `Repo.js`, `Repo.css` and `Header.js` into this directory.

Back in App.js:

- Update the `Header` import to point to the new location: `import Header from './components/Header`.
- Delete the `Repo` import (we will be importing this into different files)
- Import `Route` alongside `BrowserRouter`. The import should now be: `import { BrowserRouter, Route } from 'react-router-dom'`
- Import your new View components:

  ```js
  import Homepage from './views/Homepage'
  import About from './views/About'
  import Search from './views/Search'
  import Bookmarks from './views/Bookmarks'
  ```

- Cut everything between the `<main>` tag, paste it below, and comment it out. We'll be using this code in the next step.
- Within the `main` tag, create two new Routes that will render our components for the appropriate URLs. Your render method should now look like this:

```js
render() {
  return (
    <div className="App">
      <Header />
      <main>
        <Route path="/" component={Homepage} />
        <Route path="/about" component={About} />
      </main>
    </div>
  )
}
```

In the browser, click around in your navigation. Something is wrong! We're seeing the homepage text show up on all routes. To fix this, add the `exact` prop to the Homepage route: `<Route path="/" exact component={Homepage} />`

### ✅ Step 4: Search & Bookmarks refactor

First, we'll refactor our Repo Lists into the `Search.js` and `Bookmarks.js` views.

From the code we cut & commented in the last step, copy the appropriate parts into each component.
We will need to do a little bit of work to refactor them:

- Each of these lists needs the `Repo` component. We will import it, but before we do, it might make sense to organize things a little more:

Back in `Search.js` and `Bookmarks.js` (do these steps for each file):

- import the Repo component with `import Repo from '../components/Repo'` (the `..` means 'up one directory')
- import the `arrayIncludes` / `getRepoById` utilities (SearchResults uses `arrayIncludes`, Bookmarks uses `getRepoById`): `import { arrayIncludes } from '../utils'`

Before moving forward, let's look at what information these components are trying to use. You'll see they are referring to:

- `this.state.bookmarks`
- `this.props.searchResults`
- `this.toggleBookmark`

In all of these cases, `this` was referring to the App component. Now that we have copied all of this logic into individual components, we need to accept `bookmarks`, `searchResults`, and `toggleBookmark` as props in our components.

Refactor these two components to get this data from it's `props` object. (Or `this.props` if you are using a Class component). Your component should look something like this when you are done:

<details>
  <summary>solution</summary>

```js
import React from 'react'
import Repo from '../components/Repo'
import { getRepoById } from '../utils'

function Bookmarks(props) {
  return (
    <div className="resultsList">
      <h2>Your Bookmarks</h2>
      {props.bookmarks.map((repoId) => {
        const repo = getRepoById(props.searchResults, repoId)
        return <Repo key={repo.id} repo={repo} toggleBookmark={props.toggleBookmark} bookmarked={true} />
      })}
    </div>
  )
}

export default Bookmarks
```

</details>

Since we haven't implemented these components yet, we can't test them in the browser. We'll set this up in the next step.

### ✅ Step 5: Advanced Routes using `render`

In this step, we are going to add two new routes: one for `/search`, and one for `/bookmarks`. But, these routes will render our `<Search>` and `<Bookmarks>` components, respectively, and we need to pass these components some props. We can't do that using `Route`'s `component` prop API, so we will use the `render` prop instead.

Add the two new routes using `render`:

<details>
  <summary>solution</summary>
    
```js
  <Route
    path="/bookmarks"
    render={() => {
      return (
        <Bookmarks
          bookmarks={this.state.bookmarks}
          searchResults={this.props.searchResults}
          toggleBookmark={this.toggleBookmark}
        />
      )
    }}
  />
  <Route
    path="/search"
    render={() => {
      return (
        <Search
          bookmarks={this.state.bookmarks}
          searchResults={this.props.searchResults}
          toggleBookmark={this.toggleBookmark}
        />
      )
    }}
  />
```
</details>

You should now be able to navigate between the different routes and add & remove bookmarks. There might be some bugs to fix, so make sure everything works before moving forward.

### ✅ Step 6: Switch & Redirect

In this step, we will use `Switch` and `Redirect` to create a "Not Found" route and a simple redirect.

First: Create a new file: `/src/views/NotFound.js`. Within it, create a basic Function component that just renders "This page was not found" within some kind of text tag (h1, h2, p, etc). Make it the default export.

Next, back in `App.js`:

- Import `Switch` from React Router, along with the other components.
- Import your new `NotFound` component.
- Wrap all of your routes with the `Switch` component:

  ```js
  <Switch>
    <Route path="/" exact component={Homepage} />
    {/* ...and the rest of your routes */}
  </Switch>
  ```

- Add one more route at the very bottom. Don't give it a `path` prop, but supply `NotFound` as the `component`:

  ```js
  <Route component={NotFound} />
  ```

  Remember - the `Switch` will render the _first matching route or redirect_, and nothing else. A Route with no path will _always_ match. So, if none of the above routes are matched, your Not Found route will render.

Back in your browser, type in the URL for a route that doesn't exist - you should now see your Not Found page.

Now, let's give `Redirect` a shot:

- import `Redirect` from React Router, along with the other components.
- Just _above_ your Not Found route, add a simple `Redirect` that takes users back to the homepage:

  ```js
  <Redirect to="/" />
  ```

Now, when you visit a non-existent route, you should be immediately redirected to the homepage! Give it a shot in the browser.

At this point, our Not Found route will never render. You can remove one or the other, or leave it as-is.

### ✅ Step 7: Route Parameters

We're almost there! In this step, we will create one last Route that displays the details of a Repo based on the repo ID in the URL.

- Create a new view, `./src/views/RepoDetails.js`. For the moment, just have it return `null`.
- Back in `App.js`, add a new Route. We will be using parameters to tell our component which repo info we want to display. We also need to pass our `searchResults` into the `RepoDetails` component, so we will use the `render` API:

  ```js
  <Route
    path="/repo/:repoId"
    render={(routeProps) => {
      return <RepoDetails match={routeProps.match} searchResults={searchResults} />
    }}
  />
  ```

Now, go back to the `RepoDetails` component. Before diving in, we can make sure we are getting the data we need with `console.log(props)` (or `this.props` if you are using a Class component)

```js
function RepoDetails(props) {
  console.log(props)
  return null
}
```

In your browser, visit http://localhost:3000/repo/10270250
Open up the Developer tools, and take a look at the console. You should see it log out an object with the `match` and `searchResults` props we passed in.

#### Displaying the Data

Now that this component has a list of all of the available repos, as well as the repo ID, we can find and display the data we need using the `getRepoById` helper.

- Import `getRepoById`:

  ```js
  import { getRepoById } from '../utils'
  ```

- Next, let's get the data out of the props and get the repo out of the search results. We'll use `console.log` to help us out along the way:

  ```js
  function RepoDetails(props) {
    console.log(props)
    const { match, searchResults } = props
    const repoId = match.params.repoId
    console.log(repoId)
    const repo = getRepoById(searchResults, repoId)
    console.log('repo:', repo)
    return null
  }
  ```

- Refresh your browser and look at the console. We can now see our repo details in the console: `repo: undefined`

  🤔Wait, what? If you look at the other details, you'll see that we provided the correct ID. But, there is a little gotcha here: our `repoId` variable is a _string_, but the repo IDs are _integers_. Our helper function is comparing the repo IDs to the one we supply as the second argument.

  Type this into your console and hit enter: `'10270250' === 10270250`. You'll see this returns `false` - that's because we are comparing a string to an integer. To fix this, we can use javascript's `parseInt` function, which will parse integers from strings:

  ```js
  const repoId = parseInt(match.params.repoId)
  ```

  There we go! Now our console says: `repo: { id: 10270250, // ...etc }`

For now, we will just render this out as raw JSON instead of formatting everything. (You can come back later and use this data to build this page however you'd like)

- Get a raw JSON string from this data:

```js
const rawJSON = JSON.stringify(repo, null, 2)
```

Quick notes about `JSON.stringify`:

- The second argument is an optional formatting function. We'll pass in `null` because we just want the default one.
- The third argument is the indentation level: this just helps it look nice. (If you omit it, it will all be one long line)

- Render this within a `<pre>` tag:

```js
return <pre>{rawJSON}</pre>
```

That's it for this component! (for now) When you're finished it should look something like this:

```js
import React from 'react'
import { getRepoById } from '../utils'

function RepoDetails(props) {
  const { match, searchResults } = props
  const repoId = parseInt(match.params.repoId)
  const repo = getRepoById(searchResults, repoId)
  const rawJSON = JSON.stringify(repo, null, 2)
  return <pre>{rawJSON}</pre>
}

export default RepoDetails
```

#### Linking to the Repos

We now have a way to display this data, but our users can't navigate to it. Let's add a simple `Link` within our `Repo` component.

In `components/Repo.js`:

- Import `Link`:

  ```js
  import { Link } from 'react-router-dom'
  ```

- Get the `id` out of `this.props.repo` along with all of the other variables:

  ```js
  const { name, description, language, homepage, git_url, id } = this.props.repo
  ```

- Below the bookmark button, add a link to that repo's details page:

  ```js
  <p>
    <Link to={`/repo/${id}`}>View Details</Link>
  </p>
  ```

That's it! Now you should be able to browse from the search results to individual repos.
