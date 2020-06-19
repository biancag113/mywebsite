## HTML Form Inputs and Attributes

### Input Types
|input type| What it is for |
|:-----------:|:------:|
| text | input for a small amount of text (like a name, or address)|
| hidden | a user doesn't see this, but it is useful for populating with associated data that the user doesn't need to see and sending it via req.body |
| email| input for email, some browsers will check if it is a valid email automatically, a lot of smartphones will add the `.com` button to the keyboard |
| password | obscures the characters being typed, password matching confirmation is usually done with JavaScript |
| date | lets you choose a date from a calendar |
| color | lets you choose a color |
| file | lets you choose a file |
| range | gives a slider that you can use for input |
|number | gives arrows to go up and down, some browsers will validate for a number |
| textarea | allows for a larger amount of text to be entered, allows resizing fo the text input |
| radio | allows user to choose one option only |
| checkbox | allows user to select multiple options|
| select/options| allows user to choose from a scrolling menu, can have options for one choice or many |
| button | button input, but no default behavior|
| submit | form submission - default to do form action, if no form action, reloads the page |



### Attributes for inputs

|attributes| Purpose|
|:-----------:|:------:|
| name | the name of the key for req.body for form submission |
| id   | used in conjunction with `<label>` attribute `for` - use for screen readers/accessibility|
| value | a default value for the input |
| placeholder | puts text in the input field - but this text does not get 'grabbed' for req.body |
| autocomplete | aids in allowing autocompleting typical inputs by a user - i.e. name, address - acts differently in each browser and some browsers have functionality for autocomplete that may override the need for this attribute |
| autofocus | focuses on this field on page load |
| required | makes the field required on the HTML side of things|
| pattern | allows for regex on the HTML side (lets you check for valid input before sending to server, i.e. minimum number of characters, starts with certain characters, numbers only, letters only etc. ) |
| step | when using number or range, allows you to set the default size of a step. Without setting this, the default is usually 1 |
|min, max| allows min and max numbers for range and numbers |
| multiple | allows multiple selections with `select/options` |

