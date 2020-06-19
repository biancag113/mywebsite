# Context

### Learning Objectives:

- Explain how we simply code using abstraction
- Understand what Providers and Consumers do
- Implement a shared context to avoid prop drilling


## Why & when to use Context?

As we've covered before, React has a unidirectional data flow, passing props from parents to children. Components that manage their own state will often pass this information down as props child components.

As apps grow, the "tree" of components grows with it. Before long, you'll be asking yourself: _Where should I store and manage this state?_

There are a lot of ways to answer this question - ultimately, it comes down to your own understanding of the app, and your preferences as a developer. But, a generic way to answer this question would be: _Manage state in the nearest "ancestor" of the components that need to use it_.

#### App-level state

We discussed this briefly when we covered *lifting state* - when we had two sibling components that needed to share some state, we "lifted" the state up to the parent component.

But, there are times where pieces of state need to be used across the entire app. For instance:

 - When many views & UI components need to know who the currently logged-in user is.
 - When all UI components need to know if the app is in "light" or "dark" mode.

This is *one* of the times when Context can be useful: when you need to *manage app-level state*.

#### Avoiding Prop Drilling

So far, we have been passing props down from parent to child components. In most instances, this is the best way to handle sharing information between components: it keeps this information localized to the parts of your tree that need it. But, as your tree grows, you'll find yourself passing props down through multiple levels. For instance:

![Prop Drilling Diagram](https://javascriptplayground.com/img/posts/context-in-react/props.png)
(via [javascriptplayground.com](https://javascriptplayground.com/context-in-reactjs-applications/))

To avoid dealing with this, we can use Context to create a "shortcut" - from an ancestor to a descendant:

![Context Diagram](https://javascriptplayground.com/img/posts/context-in-react/context.png)
(via [javascriptplayground.com](https://javascriptplayground.com/context-in-reactjs-applications/))

So, another reason to use Context is to *avoid prop drilling*.


#### Creating Abstractions, Sharing Functionality

This reason is a little more about programming in general. As developers, we spend much more time *reading* code than we do *writing* it. [Robert C. Martin says this ratio is about 10 to 1](https://www.goodreads.com/quotes/835238-indeed-the-ratio-of-time-spent-reading-versus-writing-is).

To make our our own lives easier, as well as those of our fellow developers, one of our biggest concerns should be writing code that is easy to understand. Imagine you're looking at our Github Bookmarking project for the first time: In universe A, you come across this code:

```js
  componentDidMount() {
    const { repoId } = this.props.match.params
    const url = `https://api.github.com/repositories/${repoId}`
    fetch(url)
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
            repoData: data,
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


In universe B, you come across this code:


```js
componentDidMount() {
  const { repoId } = this.props.match.params
  this.props.fetchRepo(repoId).then((response) => {
    const { repoData, error } = response
    this.setState({
      repoData,
      error,
      loading: false  
    })
  })
}
```

Which one of these is easier to understand at first glance?

> (Universe A is our current universe, if you're reading this as you follow along. We'll be refactoring to get to Universe B in an exercise)

This example is a little simplistic, but it is a good demonstration of "abstraction": we are hiding all of that `fetch` functionality within a clearly-named function, `fetchRepo`. When we are working on this component, we no longer need to think about *how* this repo data is fetched - and we can use our brain to focus on the other things this component does.

*Abstraction* also comes with another benefit - sharing common functionality. Now, we can use `fetchRepo` in any other component that needs it. The cognitive overhead for implementing it will be much lower - you won't ask yourself, 🤔 _Wait, how do I use `fetch` again?_ Additionally, we can now be sure that all of our components will be fetching data in a consistent manner.


#### Summary: When & Why to use Context

1. Managing App-level state
2. Avoiding Prop Drilling
3. Creating Abstractions for simpler, more readable code
4. Sharing functionality across your app

## Setting up a Context Provider

When using Context, you'll be dealing with a *Provider* component and *Consumer* components.

*Providers* are components that exist higher up on the tree, sending - or _providing_ - information to other components that are further down. This component must wrap the parts of the tree that it will be communicating with.

The information that is communicated is what is given to the `value` prop of the provider component:

```js
<MyContext.Provider value={somethingImportant}>
  {/* The rest of the app... */}
</MyContext.Provider>
```

*Consumers* are components that receive - or _consume_ - information from their Provider ancestor. Consumer components use the *function as a child* pattern to 'extract' these values so we can use them in our own components:

### Function as a child (aka inception) example:

```js
const foo = (hello) => {
  return hello('foo');
};

foo((name) => {
  return `hello from ${name}`;
});

// "hello from foo"
```

Or the same example with more meaningful names:

```js
function wrapper(component) {
  return component({name: "Ira"});
};

wrapper(function component(props) {
  return `wrapper function runs this and injects: ${props.name}`;
});

// "wrapper function runs this and injects: Ira"
```

This is how a callback function works - it's how to create one.

```js
<MyContext.Consumer>
  {(somethingImportant) => <UserProfile somethingImportant={somethingImporant} />}
</MyContext.Consumer>
```

---

Both of these components are created by a built-in function, `React.createContext()`. This function returns an object with two properties, `Provider` and `Consumer`:

```js
const MyContext = React.createContext()

const Consumer = MyContext.Consumer

const Provider = MyContext.Provider
```

#### Provider Setup

The examples above show how to pass `somethingImportant` to the Provider - but, most of the time, we will need to update the values of `somethingImportant`. There's a simple way to do this: Just use a React component like you would anywhere else! By using `this.props.children`, we can create our own "Wrapper" component that deals with all of the Context setup on its own. For example:

```js

const UserContext = React.createContext()

/* more on this line in the next section */
export const UserConsumer = UserContext.Consumer

export class UserProvider extends React.Component {
  state = {
    currentUser: undefined
  }

  loginUser = (credentials) => {
    someApi.loginUser(credentials).then((user) => {
        this.setState({
          currentUser: user
        }) 
    })
  }

  render() {
    const value = {
      currentUser: this.state.currentUser,
      loginUser: this.loginUser
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
```

Then, in usage:

```js
import UserProvider from './UserContext' 

const App = () => (
  <UserProvider>
   {/* the rest of the app */}
  </UserProvider>
)
```

#### Using Consumers

Now that a Provider is set up and wrapping our app, we can get its value from the `UserConsumer` that we exported. For instance, to put their avatar in a Header:

`Header.js`

```js
import { UserConsumer } from './UserContext'

const Header = (props) => {
  return (
    <div className="header">
      <UserAvatar user={props.currentUser} />
    </div>
  )
}

const HeaderWithUser = () => (
  <UserConsumer>
    {(userProps) => <Header {...userProps} />}
  </UserConsumer>
)

export default HeaderWithUser
```

Or, in a login form:


`Login.js`

```js
import { UserConsumer } from './UserContext'

const Login = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    /* do some stuff to get email & password out of the form */
    this.props.loginUser({
      email,
      password
    })
    const password = e.target

  }

  if (props.currentUser) return <Redirect to="/dashboard" />

  return (
    <form onSubmit={props.loginUser}>
      <label htmlFor="email">Email address:</label>
      <input name="email" />
      <label htmlFor="password">Password:</label>
      <input name="password" type="password"/>
    </form>
  )
}

const LoginWithUser = () => (
  <UserConsumer>
    {(userProps) => <Login {...userProps} />}
  </UserConsumer>
)

export default LoginWithUser
```


#### Summary

Some general notes about Context:

 - Typically, Provider components go at the very top of the tree.
   - React Router's `BrowserRouter` component is a Provider that communicates with all of the `Link`, `Route`, and other components. The `BrowserRouter` sits at the top of the tree.
   - *But*, this is not always the case. For instance, you might create a `Form` component that uses Context to communicate with all of its `Input` elements.
   - *Where you put Providers is up to you*
- Consumers can only communicate with *one* provider.
- Yeah, I know that wrapping your components with Consumers, and dealing with functions can be a little cumbersome. But - when we cover React Hooks in a later lesson, we'll be able to do this in one line, and without any extra wrapper components. Here's a preview:

```js
import { UserContext } from './User'

const Header = () => {
  const { currentUser } = React.useContext(UserContext)
  return (
    <div className="header">
      <UserAvatar user={currentUser} />
    </div>
  )
}
```

## Demo

🔗 [Codesandbox Demo](https://codesandbox.io/s/context-demo-vrx3z)
🔗 [Codesandbox Demo (solution)](https://codesandbox.io/s/context-demo-solution-w-appwrapper-eyfl4)

Q: What does Spread Syntax do? `{ ...spread }`

#### How `this.props.children` works:

```js
function Box(props) {
  return <div style={boxStyles}>{props.children}</div>
}
```
props.children is anything you pass inside of `<Box></Box>` in jsx.


```js
function Nested(props) {
  return (
    <Box>
      <ClickerButton />
    </Box>
  );
}
```

#### Child render function:

```js
function Nested(props) {
  return (
    <Box>
      <ClickerButton />
    </Box>
  );
}
```
really does this under the hood:

```js
function Nested(props) {
  return (
    <Box children={<ClickerButton />} />      
  );
}
```

it passes the nested component(s) as a prop called "children"


# Exercise

[Exercise 1](2-context-exercise-1.md)


# Resources

[Light and Dark theme using context example](https://reactjs.org/docs/context.html#dynamic-context)