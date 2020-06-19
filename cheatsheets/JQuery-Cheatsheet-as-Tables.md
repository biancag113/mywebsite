# jQuery Cheatsheet
A Cheatsheet of common jQuery methods, continue exploring all the methods and all their details at https://jquery.com/

Notes: 
- `$div`, `$img` , `$input`, `$h1` - are variable names for jQuery elements - a div, an image and an input, h1 respectively it is expected that these elements were queried and saved to these variable names and unless stated otherwise, there is only one of them
- `$li` is another example - but in this case it is expected there are multiple `li`s on the page
- jQuery has `getters` and `setters` - some methods are the same. If there is no value passed into the function ie. `$h1.text()` - it will `get` the text of the `h1` element. If a value is passed in, then it will `set` the value `.text('hello')`
- jQuery can get single elements or it can get `collections` of elements if there is more than one

## Document Ready/ Window.onload

```js
$( () => {
  //jQuery code goes here
});
```

## Create

| jQuery Command | What it does |
|:-:|:-:|
|`$('<div>')`| creates a new div|
|`$div.clone()`| clones the div (makes a copy) |

## Queries

| jQuery Command | What it does |
|:-:|:-:|
|`$('div')`| queries for all `div` elements|
|`$('#container')`| queries for the element with an `id` of `container`|
|`$('.card')`| queries for the elements with a `class` of `card`|
|`$div.children()`| queries for the children of `$div` |
|`$div.parent()`| queries for the parent of `$div` |
|`$input.val()`| get the value inside an input field |
|`$h1.text()`| get the text inside an h1|
|`$div.html()`| get the html inside a div |
|`$li.eq(indexNum)`| get the indexNum `li` - jQuery returns a collection which is array-like, but not an array. To use jQuery methods, you must use `.eq()` to access these items as jQuery objects |



## Set Attributes

| jQuery Command | What it does |
|:-:|:-:|
|`$div.attr('id', 'idName')`| adds an `id` of `idName` to the `div` |
|`$img.attr('src', 'urlToImage')`| adds a `src` of `urlToImage` to link to an image somewhere on the web start with `http...` for an image in your project, use a relative url |
|`$img.attr('alt', 'some description')`| adds a `alt` of `some description` |
|`$div.addClass('className')`| adds a class of `className` to the `div` or `div`s|
|`$input.val('hello')`| set the value inside an input field |
|`$h1.text('hello')`| set the text inside an h1|
|`$div.html('<p>hello</p>')`| set the html inside a div |
|`$h1.css('color', 'orchid')`| set the text color to `orchid` |


## Appending

| jQuery Command | What it does |
|:-:|:-:|
|`$('body').append($div)`| appends a div to the body as the last item inside the body|
|`$('body').prepend($div)`| appends a div to the body as the first item inside the body|
|`$($div).appendTo('body')`| appends a div to the body as the first item inside the body|

## Removing

| jQuery Command | What it does |
|:-:|:-:|
|`$div.removeClass('someClass')`| remove the class `someClass` from a div |
|`$('body').remove()`| remove the body (and all its content) from the DOM completely |
|`$('body').detatch()`| remove the body from its location but stores the data and events associated with it |
|`$('body').hide()`| leaves the element in place, but sets its css display to `none` |
|`$('body').empty()`| leaves the `body` in place but empties all the children of the body |
|`$div.removeAttr('id')`| remove the attribute of `id` from a div |

## Listening and Handling

| jQuery Command | What it does |
|:-:|:-:|
|`$div.on('click' , () => {})`| set an event listener on click, anonymous function |
|`$div.on('hover' , `some function`)`| set an event listener on hover with a reference to a function |
|`event.target`| gets the target(element) of the event that is being listened to. This `bubbles` and can target any elements inside the targetted element |
|`event.currentTarget`| gets the current target element, is the equivalent of jQuery `this` most of the time|
|`$(this)`| older method to get the current target element, typically does not work as expected with arrow functions|

