# Bonus (Optional) Context Exercise: Part 2 - Optimizing Fetch Requests

In the last exercise, we consolidated our Bookmarking state and functionality into a single provider, and passed that information to child components via Context.

In this exercise, we'll add one more provider, which will handle making requests to the Github API. This way, when we need to fetch data in a component, we can do it using a simpler (abstracted) API instead of needing to write out our `fetch` calls manually. This will also give us the opportunity to cache our search results.

## ✅ Review: Memoization

Before we dive in, a refresher on 'memoization', Memoization is a simple way to get functions to 'remember' the previous results they have returned.

🔗 [Memoization Demo](https://jsbin.com/fududif/edit?js,console)

## ✅ Step 1: Create a new Provider

- Create a new file, `./src/providers/GithubAPI.js`
- Copy in the values from `BookmarkContext.js` as a template
- Remove the state, methods, and value.
- Rename everything from `Bookmark` to `Github`, i.e. `BookmarkContext` 👉 `GithubC ontext`

Your component should now simply wrap its children in `GithubContext.Provider`, with no value prop being passed in.

Back in App.js:

 - Import `{ GithubProvider }` from the file you just created.
 - At the bottom of the file, wrap the `App` with the new provider, just like the Bookmark Provider

Check your app in the browser - everything should load and work as before.


## ✅ Step 2: Add some `fetch` functionality

Let's review the things we are doing with the Github API across our app:

 - Fetching repository data in `Repo.js`
 - Fetching repository data in `RepoDetails.js`
 - Searching for repositories in `search.js`

The first two of these implementations are exactly the same. The last one is a little different, but not too different. We'll combine all of these into simple methods that we can use in our components.

In GithubAPI.js:

- Add a method to this component called `githubFetch`. It should accept one argument, `uri`.
- Add another method called `fetchRepo`, which accepts a `repoId` argument
- Add a third method called `searchRepos`, which accepts a `searchTerm` argument

```js
export class GithubProvider extends React.Component {
  githubFetch = (uri) => {
    /* ... */
  }
  
  fetchRepo = (repoId) => {
    /* ... */
  }
  
  searchRepos = (searchTerm) => {
    /* ... */
  }
  
  render() {
    return <GithubContext.Provider>{this.props.children}</GithubContext.Provider>
  }
}
```

Instead of implemeting `fetch` within both `fetchRepo` and `searchRepos`, we can put all of that logic in `githubFetch` and handle it all in a general way. All this function needs to know is what URL of the github API to query - and it will simply return whatever it finds.

The base URL will always be `https://api.github.com/`, so we just need to pass it the rest of this path (the URI).

Paste this into the `githubFetch` method, and insert your own token:

```js
  githubFetch = (uri) => {
    const url = `https://api.github.com/${uri}`
    return fetch(url, {
      headers: {
        Authorization: 'token 81e68808c624ceb35a4a1bfdfc5de911f5522ad2',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(`results from ${url}:`)
        console.log(data)
        return data
      })
      .catch((error) => {
        return error
      })
  }
```

This is almost the same as how we were using it before, except:

 - We aren't using `this.setState` (that will be the responsibility of the components we use this in)
 - We are **returning** `fetch`. That means that we are returning a Promise - so, within the components, we will be able to use `.then()` to handle the incoming data. (more on this in a later step)

(lecture note: walk through Promise syntax)

Let's make sure our fetch is working. In your render method, add this line above the return: 

```js
this.githubFetch('repositories/1')
```

Back in your browser, inspect the console - you should see the search results log out.



## ✅ Step 3: Fetch Repos

Now that we have the basic `fetch` functionality in place, we only need to provide the right URL.

- In the `fetchRepo` method:
 - Create the correct URI based on the incoming `repoId`:
 ```js
 const uri = `/repositories/${repoId}`
 ```
 - Call `this.githubFetch` using that URI. Because `githubFetch` returns a promise, we will handle our results with the `.then` method:

 ```js
 this.githubFetch(uri).then((repoData) => {
   console.log(`Fetched repo ${repoId}`)
   console.log(repoData)
 })
 ```

Back in the render method, replace our test call with `this.fetchRepo(1)`. Check the browser logs you should see the new information logged out as well as what we had before.

We're now fetching our data - but, the last thing we need to do is return it. When we call `fetchRepo` or `searchRepos`, we won't get our results instantly - since it has to call the Github API, which will take time, the whole operation is _asyncrhonous_. When we call these functions, we will use the `.then()` method. Our usage (in a later step) will look like this:

```js
this.props.fetchRepo(repoId).then((repoData) => {
  this.setState({
    /* ... */
  })
})
```

When we call `fetchRepo`, we want to get a Promise that will eventually give us our repo data. Fortunately, the return value of `githubFetch` is the `fetch` call itself, which is a Promise - and the one that will, eventually, resolve with some Github data. To do this in `fetchRepo`, we can simply return our call to `this.githubFetch`:

```js
fetchRepo = (repoId) => {
  const uri = `repositories/${repoId}`
  return this.githubFetch(uri)
}
```

(Promises are kind of tricky and weird until you get used to them ~ please ping me on Slack if you're having trouble with them!)

## ✅ Step 4: Search Repos

You're on your own for this step! Do the same thing as step three for the `searchRepos` method. Take a look at what we have in Search.js to see what URI it should pass to `this.githubFetch`

## ✅ Step 5: Provide the `fetchRepo` and `searchRepo` methods 

Based on how we passed in a `value` to the Provider in BookmarkProvider.js, give the `GithubContext.Provider` a value that includes the two search methods we just created.

(You can remove the calls to `console.log` at this point, if you want)

## ✅ Step 6: 'Consume' the methods 

Now that we have these methods in the context, we can pass them down to our Consumer props. Let's start with Search.js:

 - Import the `{ GithubConsumer }` component at the top of the file.
 - Using Repo.js as a template, create a new 'Wrapper' component that renders the `GithubConsumer` and passes its values down to the `Search` component.
 - In the `render` or `componentDidMount` method of `Search`, enter `console.log(this.props)`

 Check your browser logs - you should see that Search's props now includes a `searchRepos` function.

 Do the same in Repo.js and RepoDetails.js. In Repo.js you can include the GithubConsumer in the same "Wrapper" component you used before, like so:

 ```js
function RepoWrapper(props) {
  return (
    <GithubConsumer>
      {(githubProps) => {
        return (
          <BookmarkConsumer>
            {(bookmarkProps) => {
              console.log(bookmarkProps)
              return <Repo {...props} {...bookmarkProps} {...githubProps} />
            }}
          </BookmarkConsumer>
        )
      }}
    </GithubConsumer>
  )
}
 ```


## ✅ Step 7: Implement the methods

Before we start tearing our old code down, let's look at what we currently have. Here's the full `search` method from Search.js, as it is now:

```js

  search = () => {
    this.setState({ loading: true })

    const { searchTerm } = this.state
    const url = `https://api.github.com/search/repositories?q=${searchTerm}`
    fetch(url, {
      headers: {
        Authorization: 'token 81e68808c624ceb35a4a1bfdfc5de911f5522ad2',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.message) {
          this.setState({
            loading: false,
            error: data.message,
          })
        } else {
          this.setState({
            loading: false,
            searchResults: data.items,
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        })
      })
  }

```

Our component still needs to be responsible for assigning the response data and handling any errors. But, we don't need to deal with `fetch` anymore. With our new `searchRepos` method that has been provided as prop, we can replace these lines:


```js
    const url = `https://api.github.com/search/repositories?q=${searchTerm}`
    fetch(url, {
      headers: {
        Authorization: 'token 81e68808c624ceb35a4a1bfdfc5de911f5522ad2',
      },
    })
    .then((response) => {
      return response.json()
    })
```

with this:

```js
this.props.searchRepos(searchTerm)
```

The full refactored implementation is:

```js
search = () => {
    this.setState({ loading: true })

    const { searchTerm } = this.state
    this.props.searchRepos(searchTerm)
     .then((data) => {
        if (data.message) {
          this.setState({
            loading: false,
            error: data.message,
          })
        } else {
          this.setState({
            loading: false,
            searchResults: data.items,
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.message,
        })
      })
  }
```

After updating the `search` method, save and run a search in the browser. Everything should work as it did before.

Lastly, in Repo.js and RepoDetails.js - do the same thing that we did here, using `this.props.fetchRepo` to replace the big `fetch` chain.

## 🧠  Recap

There we go, we refatored our app (twice!) to leverage Context - once for Bookmarking, and once for making calls to the Github API.

Some of the benefits of this have been:

 - No more prop drilling
 - Simpler-to-use functions (via *abstracting* our api calls into a separate function) - now we don't have to care about how the Github API stuff is happening when we're working on the other components. When we're working on the Github API Provider, we only have to worry about one thing: fetching and returning the data.
 - More consistency across API calls - and we now have a kind of "toolkit" we can add other methods to. For instance, if we built out a User Details view, it would be pretty simple to create a new `fetchUser` method - it would only take a few lines!

## ✅ Step 8: Bonus - Caching the API calls

One more benefit of putting all of this in a single place is that we can now enhance some of this functionality -- and those enhancements will be of benefit everywhere else in our app where these methods are used. For the last step in this lesson, we'll cache our API calls with memoization.

First off, in GithubAPI.js do one of the following:

 - Add the memoization function from the JSBin demo to your app. You can either put it in a separate `./utils` module, or just at the top of the Github.js file. 
 - Or, `npm install lodash --save`, then import Lodash's memoize:
 ```js
 import { memoize } from 'lodash'
 ```

We saw how to memoize a standalone function, but how do we memoize a method on a class? Let's look at the `githubFetch` method:

```js
  githubFetch = (uri) => {
    const url = `https://api.github.com/${uri}`
    return fetch(url, {
      headers: {
        Authorization: 'token 81e68808c624ceb35a4a1bfdfc5de911f5522ad2',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .catch((error) => {
        return error
      })
  }
```

So, `githubFetch` equals... a function. And, the parameter we use in `memoize` is just a function. That means we can just wrap the whole function in `memoize`!

```js
  githubFetch = memoize((uri) => {
    /* same code inside the function... */
  })
```

And that's it! If you use the memoize function from our demo, you can see it log to the console when we are returning a cached result. To give this a try in the browser, do a search for "react", then a search for "xyz", then another search for "react". You'll see that the search results for the second "react" seach appear immediately - no loading.

You'll also see that, as the `Repo` components render to the page, they are all cached as well. As we search and bookmark, *every* request to the Github API gets cached locally.

