# React Router 101

Learning Objectives:

- Understand server-side and client-side rendering
- Set up basic routing with React Router's `BrowserRouter`, `Route` and `Link`, `Switch` and `Redirect` components

## What is routing?

A simple way to describe routing would be:

> The logic or process that returns certain data given a URL path

This data might be HTML, a JSON response in an API, an RSS feed - anything that can be accessed with a URL. Traditionally, all of this routing happened on the server. When navigating from page to page on a website, your browser requests a new URL with each page change, and in turn receives a new HTML document. But, as the needs and interactivity of websites and web apps has grown, it has become increasingly common to handle routing on the "client-side", or within the user's browser.

### Server-side routing

Before we get into routing in the browser, let's take a look at how routing has traditionally happened on the server. A simple static file server - one that you could access with FTP - might serve a simple blog website with a file structure like this:

```
├── index.html
├── about.html
├── posts
│   ├── index.html
│   ├── post-1.html
│   └── post-2.html
```

When we navigate to this website with the url `http://wwww.example-blog.com`, our browser sends some information to the server in its request. One of the things it sends is the "path" of the URL, which is anything after the `.com`. For this first request, the path is just `/`. The server looks in the directory and finds `index.html` and returns it. The other paths resolve to different files, depending on their own path within the server:

| request URL                         | path            | 👉 resolves to       |
| ----------------------------------- | --------------- | -------------------- |
| `www.example-blog.com`              | `/`             | `/index.html`        |
| `www.example-blog.com/about`        | `/about`        | `/about.html`        |
| `www.example-blog.com/posts`        | `/posts`        | `/posts/index.html`  |
| `www.example-blog.com/posts/post-1` | `/posts/post-1` | `/posts/post-1.html` |
| `www.example-blog.com/posts/post-2` | `/posts/post-2` | `/posts/post-2.html` |
| `www.example-blog.com/posts/post-3` | `/posts/post-3` | 🚫 Not found!        |

### Client-side routing

When routing in the browser, all of this happens a little differently. When we navigate from page to page, our browser does not send new HTTP requests for that URL. Instead, it updates the URL in our browser, and renders new content depending on what that URL is. The benefits of this are:

- Our app's state is maintained, because we aren't refreshing or loading a new page
- Our user gets very fast page transitions and a much smoother experience

When we visit a website, we still make an initial HTTP request to the server - but, instead of looking around for various HTML files, it will (in a simple web app) always return the same `index.html` file. That file will then load up your app, and your app then looks at the current URL to determine what to render. So, the above request/response table would look like this for a web app with routing:

| request URL                         | path            | 👉 resolves to |
| ----------------------------------- | --------------- | -------------- |
| `www.example-blog.com`              | `/`             | `/index.html`  |
| `www.example-blog.com/about`        | `/about`        | `index.html`   |
| `www.example-blog.com/posts`        | `/posts`        | `index.html`   |
| `www.example-blog.com/posts/post-1` | `/posts/post-1` | `index.html`   |
| `www.example-blog.com/posts/post-2` | `/posts/post-2` | `index.html`   |
| `www.example-blog.com/posts/post-3` | `/posts/post-3` | `index.html`   |

_Note that, as we browse the website, these request URLs aren't being sent to the server. This only happens when we go to that URL directly by typing/pasting the URL in the browser bar, or refreshing when we are already at that location._

Since we are now handling this logic in the browser, it means that we have some new responsibilities - things that were previously handled on the server:

- Determining what UI to display depending on the URL
- Loading any necessary data for that UI
- Handling 404 / not found pages. (You'll see in the table above that `/posts/post-3` will still return our main index.html)

## React Router

Fortunately, we don't need to write all of this from scratch. Other people have already done this for us and released their work as open-source. [React Router](https://reacttraining.com/react-router/) has become the most popular solution for handling routing in React.

Let's dive in with an example:

🔗 [CodeSandbox Demo](https://codesandbox.io/s/react-router-demo-mr4dx)

This example covers 3 of the 5 components we will be using: `Router`, `Link`, and `Route`

### Routers: `BrowserRouter`, `HashRouter` and `StaticRouter`

In the demo, you will see a `BrowserRouter` at the top of the component tree:

```js
return (
  <BrowserRouter>
    <div>{/* ...etc  */}</div>
  </BrowserRouter>
)
```

This component is a "Provider", which supplies information and functionalty to the other components. This all happens in the background, so the only thing to know for right now is that you need to put a router at the top of your application's component tree so it can communicate with all of the other RR components. (We will be creating our own providers in a later lesson on Context)

We will be using `BrowserRouter`: it handles URLs in the most straightforward way. The other two routers are:

- `HashRouter`, which prepends a `/#/` to all URLs. If you are serving your app from a simple static file server, this ensures that a request to `/#/posts/my-post` will still return the base `index.html` - the server will ignore anything after the `#` in the URL request.
- `StaticRouter` is mostly used for Server Side Rendering. We won't be covering SSR, but you can read more about it [here](https://reacttraining.com/react-router/web/api/StaticRouter)

### `Link`

To navigate around our app, we need to provide our users with links. In normal HTML, we would do this with an anchor tag:

```js
<a href="/posts/my-post">My first post</a>
```

If we do that in React, the browser will handle these links the standard way: by making a new HTTP request to the server for `/posts/my-post`. To prevent that, we can render our links with RR's `Link` component, using the `to` prop instead of `href`:

```js
<Link to="/posts/my-post">My first post</Link>
```

This will update the browser's URL to `/posts/my-post`, and then your routes will handle rendering the content.

_(Note: You will still use anchor tags for linking to external webistes)_

### `Route` with `component`

Straight from the [React Router docs](https://reacttraining.com/react-router/web/api/Route):

> The Route component is perhaps the most important component in React Router to understand and learn to use well. Its most basic responsibility is to render some UI when a location matches the route’s path.

In use, it looks like this:

```js
<Route path="/about/" component={About} />
```

A `Route`'s logic could be summarized as:

> Does the current URL match my `path` prop? If so, I'll render the component that was given to me with the `component` prop.

So, the above example would render the `About` component whenever the URL matches `/about/`. But, _matches_ could also be thought of as "starts with": so, if the url is `/about/contact`, the `About` component would still render. This means that the `About` component would be responsible for rendering an About page as well as a Contact page. If we wanted to break this up into individual routes, we can use the `exact` prop to tell the Route that we only want to render our component when the URL matches _exactly_:

```js
<Route path="/about/" exact component={About} />
<Route path="/about/contact" exact component={Contact} />
```

💡NOTE: a Route with no `path` prop will _always_ render. We will discuss this more in a later step.

### 🏋️‍♀️ Exercise:

> 🔗 Steps 1-3 in the [Exercise Readme](2-exercise.md)

### `Route` with `render`

The example above is the simplest: on `/about/`, render the `About` component. But, what do we do when we need to pass props to `<About>`? The simpler `component` API doesn't allow for that. Instead, we can use `Route`'s `render` property.

The `render` property accepts a function that returns JSX, and looks like this:

```js
<Route
  path="/dashboard"
  render={() => {
    return <Dashboard currentViewer={this.state.currentViewer} />
  }}
/>
```

In this example, our `Route` is being rendered by a Class component that keeps the `currentViewer` in its state. Using the `render` property, we can pass in the current viewer. We can even include some logic in this function: for instance, we can use RR's `Redirect` component to redirect users to log in if there is no `currentViewer`:

```js
<Route
  path="/dashboard"
  render={() => {
    if (!this.state.currentViewer) return <Redirect to="/login" />
    return <Dashboard currentViewer={this.state.currentViewer} />
  }}
/>
```

### The `Switch` component

The examples we have covered will handle some basic routing. But, sometimes it doesn't do what we would expec. Consider this code:

```js
<Route path="/" component={Homepage} />
<Route path="/about/" component={About} />
<Route path="/about/contact" component={Contact} />
<Route component={NotFound} />
```

It looks straightforward at first, but there are some problems: since we didn't include `exact` props on these routes, a visit to `/about/contact` would render _all_ of these components.

If we add `exact` to the first three routes, that helps. But the `NotFound` component will still render, no matter what the location is. To solve this problem, we can use React Router's `Switch` component.

[From the docs](https://reacttraining.com/react-router/web/api/Switch):

> Renders the first child <Route> or <Redirect> that matches the location.
>
> How is this different than just using a bunch of <Route>s?
>
> <Switch> is unique in that it renders a route exclusively.

In other words, a `Switch` will only ever render _one_ `<Route>` or `<Redirect>` component, and it will always be the first one it finds. Now, with `Switch` and the `exact` prop, we can get the routing we want with this code:

```js
<Switch>
  <Route path="/" exact component={Homepage} />
  <Route path="/about/" exact component={About} />
  <Route path="/about/contact" exact component={Contact} />
  <Route component={NotFound} />
</Switch>
```

We could even rearrange the components if we don't want to use `exact`. This will do the same thing:

```js
<Switch>
  <Route path="/about/contact" component={Contact} />
  <Route path="/about/" component={About} />
  <Route path="/" component={Homepage} />
  <Route component={NotFound} />
</Switch>
```

### The `Redirect` component

This one is pretty simple! Any time a `<Redirect>` component renders, the user is immediately redirected to the new location. Instead of displaying a "Not Found" page, we can redirect users to the homepage whenever they visit a location that doesn't have a route:

```js
<Switch>
  <Route path="/about/contact" component={Contact} />
  <Route path="/about/" component={About} />
  <Route path="/" component={Homepage} />
  <Redirect to="/" />
</Switch>
```

### 🏋️‍♀️ Exercise:

> 🔗 Steps 4-6 in the [Exercise Readme](2-exercise.md)

### Route Parameters & Dynamic URLs

So far, we have been defining _static_ routes - ones that are hard-coded and accept only the specific paths. But, we will often need these routes to be _dynamic_ - allowing them to accept different variations of a path.

Going back to our example Blog routes:

| request URL                         | path            |
| ----------------------------------- | --------------- |
| `www.example-blog.com`              | `/`             |
| `www.example-blog.com/about`        | `/about`        |
| `www.example-blog.com/posts`        | `/posts`        |
| `www.example-blog.com/posts/post-1` | `/posts/post-1` |
| `www.example-blog.com/posts/post-2` | `/posts/post-2` |
| `www.example-blog.com/posts/post-3` | `/posts/post-3` |

We can handle the first three routes statically. But, what about the last three? Our blog might grow to hundreds of posts - but we know that each post is going to be rendered using the same component. Instead of hard-coding these routes one-by-one, we can use **route parameters**. Route parameters are wildcard placeholders that will accept _any_ path for that segment of the URL.

Setting up a dynamic route with parameters looks a lot like a static route, but with one small difference (actually, a one _character_ difference). We can set up a route that will go to any of our posts like this:

```js
<Route path="/posts/:postSlug" component={BlogPost} />
```

The difference here is the `:` character at the beginning of the second segment. What this says to React Router is: _Match any url that is `/posts/something`, and give me the value of that something in a variable_.

> 🤔 \*'slug' is a term often used for a URL-safe string that identifies a particular page

React Router provides all of its child components with some props: `history`, `location`, and `match`.

The `match` is an object that contains information about that route, and how it was matched with the current location. When we are using a route with parameters, it supplies those values in its `params` property. If we visit `/posts/my-first-post`, the `match` prop provided to `BlogPost` will look like this:

```js
{
  path: "/posts/:postSlug",
  url: "/posts/my-second-post",
  isExact: true,
  params: {
    postSlug: 'my-second-post'
  }
}
```

🔗[CodeSandbox Demo](https://codesandbox.io/s/react-router-params-demo-rzlys)

While this doesn't give our component all of the data for the blog post, it does provide a starting point. From there, we can use that information to query an API, search through a collection of data, or whatever we else we need to get the info we need.

If you need to use the Route's `render` API, the function you provide to it will receive these props, and you can pass them down to the component. For example:

```js
<Route
  path="/posts/:postSlug"
  render={(routeProps) => {
    const { match } = routeProps
    return <BlogPost match={match} />
  }}
/>
```

### 🏋️‍♀️ Exercise:

> 🔗 Step 7 in the [Exercise Readme](2-exercise.md)
