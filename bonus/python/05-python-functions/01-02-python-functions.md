<img src="https://i.imgur.com/uz3kC2P.jpg">

# Python Functions 

## Learning Objectives

| Students Will Be Able To: |
|---|
| Define functions in Python |
| Invoke functions in Python |
| Use `*args` and `**kwargs` parameters |
| Contrast Python and JavaScript functions |

## Set Up

To experiment with the code in this lesson, please use a Python-based repl in [repl.it](https://repl.it)

## Function Basics

### Review the Use Case of Functions - What & Why?

<details><summary>What is a function?</summary>
<p><strong>
A function is a block of statements that can be called with inputs and often return an output.
</strong></p>
</details>

<details><summary>Why are there functions?</summary>
<p><strong>
Functions provide:

- Code organization/modularization
- Code reusability
- Readability (when functions are appropriately named)
</strong></p>
</details>
<br>

Functions are the building blocks of programming and all programming languages have them, including Python...

### Defining Functions in Python

Here's how we define a basic function in Python:

<img src="https://i.imgur.com/pixhxbF.png">

As you can see:

- The first line starts with the `def` keyword. This defines a function.
- The next word is the name (identifier) of the function.
- Following that is a parameter list inside parentheses.
- The first line ends with a colon.
- The first line is followed by an indented code block that we have become familiar with.
- Python functions, like JS, optionally return a value using a `return` statement.

### A Minimal Function in Python

In JavaScript, we often would create an "empty" function temporarily.

In a Python repl, let's "stub up" a function Python:

```python
def first_function():
  pass
```

The `pass` statement is simply a "do nothing" statement and is useful here to create a function that has at least one statement in its block, which is a requirement. 

<details><summary> What does a JS function return by default if it doesn't include a return statement?</summary>
<p><code>undefined</code></p>
</details>

Let's see what a Python function returns by default:

```python
def first_function():
  pass

# Assign value returned by default
result = first_function()
print(result)
``` 

Good guess!

### Calling Functions

In Python, calling functions is the same as it is in JavaScript:

```python
def add(a, b):
  return a + b
  
def sub(a, b):
  return a - b

print(add(1, 2))
print(sub(1, 2))
```

Let's learn more about Python's **parameters** & **arguments**...

### Parameters & Arguments

* A function can have no parameters, one parameter, or many parameters
* **Parameter**: The variable that's defined in a function's declaration
* **Argument**: The actual value passed into the function when the function is called

* Just like in JS, **parameters** are the placeholders for passing input to a function.

```python
# a & b are parameters
def add(a, b):
  return a + b
```

* Also like JS, the values/expressions passed in to a function when calling it are known as **arguments**:

```python
num = 5

# num & 10 are arguments
add(num, 10)
```

However, unlike JavaScript, Python requires that the correct number of arguments be provided when calling a function. For example:

```python
def add(a, b):
  return a + b
  
add()
  
# Generates the following error:
# TypeError: add() missing 2 required positional arguments: 'a' and 'b'
```

* The relative **position** of arguments matter!

```python
def greetings(name, age, job):
    return f'Hello, my name is {name}, I am {age}, and I am an {job}'

print(greetings('Simu', 30, 'actor'))
#--> Hello, my name is Simu, I am 30, and I am an actor

# Oops
print(greetings(25, 'engineer', 'Muhammad'))
#--> Hello, my name is 25, I am engineer, and I am an Muhammad
```

## Advanced Function Parameters

### Keyword Arguments

We see that normally the position order of arguments matter very much!

Much like if you go to a restaurant, *by default* you will get drinks, then appetizers, then entrees, then desserts.

However, you are free to ask your waiter to bring your dessert first instead. You don't need to specify anything if the default order is fine, but if you are going to reinvent dinner order, you will need to say something!

Using **Keyword Arguments (kwargs)**, order doesn't matter:

* Arguments are named according to their corresponding parameters
* Order doesn't matter - Python will check the names and match them!
* Values are assigned because the *keyword argument* and the *parameter name* match

```python
print(greetings(age=25, job='engineer', name='Muhammad'))
#--> Hello, my name is Muhammad, I am 25, and I am an engineer

print(greetings(job='nurse', name='Keisha', age=33))
#--> Hello, my name is Keisha, I am 33, and I am an nurse
```

#### Mix It Up... But Not With Every Argument?

Fun fact: You can provide some args in order (**positional**) and some with keywords.

```python
print(greetings('Muhammad', job='engineer', age=25))
#--> Hello, my name is Muhammad, I am 25, and I am an engineer
```

* Positional arguments are assigned in sequential order
* Keyword arguments have to come last!
* What happens if you put a kwarg first?
  * `print(greetings(job='engineer', 'Muhammad', age=25))`
  * `SyntaxError: positional argument follows keyword argument`
* What happens if you name two arguments the same?
  * `print(greetings(job='engineer', name='Muhammad', name='Jill', age=25))`
  * `SyntaxError: keyword argument repeated`

### Optional Arguments

**Optional parameters** have default values, so you don't need to pass arguments into them.

Only pass in an optional argument if you need it to be something other than the default!

```python
def greetings(name, age, job, city='Toronto'):
    return f'Hello, my name is {name}, I am {age}, and I am an {job}, and I live in {city}'

print(greetings('Simu', 30, 'actor'))
#--> Hello, my name is Simu, I am 30, and I am an actor, and I live in Toronto

print(greetings(job='nurse', name='Keisha', age=33, city='Atlanta'))
#--> Hello, my name is Keisha, I am 33, and I am an nurse, and I live in Atlanta
```

### Python's `*` Parameter Specifier (`*args`)

`*args` is a parameter that says "Put in as many arguments as you'd like!"

* Pronounced like a pirate - "arrrrghhhs!"
* Known as **multiple positional arguments**
* The `*` at the beginning is what specifies the variable number of arguments

Using the `*` ("star") specifier in a parameter list allows us to pass in a varying number of **positional** arguments into a function.

```python
def multiply(*args):
  # If you print(type(args)) here, you would see that it is a <class 'tuple'>!
  total = 1

  # We don't know the number of args, so we need a loop
  for num in args:
    total *= num

  return total

print(multiply(4, 5, 6)) # Prints 120!
```

* Declaring `*args` as a parameter gives us a list of arguments inside `args` (without the `*`), that we can loop over!
* Remember the `*=` shorthand syntax?
* Note how we declared a `total` variable to accumulate the total (called a 'product' in math)
* Don't forget the `*` and the `s`
  * The `*` indicates the variable number of arguments
  * The `s` tells other programmers that your intention is to accept multiple arguments
  * Writing `*arg` would be very confusing to someone maintaining your code in the future!
* (By they way, `*args` is just a convention, you can also say `*spoons` if you want, but that wouldn't make much sense!)

#### We Do: `*args`

Let's create a file `args_practice.py`.

* We'll write a function, `add` that takes any numbers of arguments and adds them together
* At the end, print out the sum
* Let's try it with `add(4, 5, 6)` and `add(6, 4, 5)`. The order doesn't matter!
* `*args` says "any number" - you can even pass in none at all!

<details>
<summary>Solution (SPOILER ALERT)</summary>
<pre>
def add(*args):
  sum = 0
  for num in args:
    sum += num
  return sum
print(add(4, 5, 6)) # Prints 15
</pre>
</details>

Always use the `*args` parameter **after** any **required** positional parameters. For example:

```python
def dev_skills(dev_name, *args):
  dev = { 'name': dev_name, 'skills': [] }
  for skill in args:
    dev['skills'].append(skill)
  return dev

print(dev_skills('Alex', 'HTML', 'CSS', 'JavaScript', 'Python'))
# -> {'name': 'Alex', 'skills': ['HTML', 'CSS', 'JavaScript', 'Python']}
```



### Python's `**` Parameter Specifier (`**kwargs`)

Now that you know about **multiple positional arguments**, and you know about **keyword arguments**... How crazy would it be if we could mix these two together?

In fact, it's not crazy at all.

If you'd like to be able to access a varying number of **keyword** arguments, use `**kwargs` at the **end of the parameter list**.

Note the double `**`! The parameter becomes a **dictionary** that you can iterate over.

```python
def dev_skills(dev_name, **kwargs):
  dev = {'name': dev_name, 'skills': {}}
  # unpacking the tuples returned by the items function
  for skill, rating in kwargs.items():
    dev['skills'][skill] = rating
  return dev

print(dev_skills('Jackie', HTML=5, CSS=3, JavaScript=4, Python=2))
```

### Combining Required Positional, Optional Positional (`*args`) & Keyword (`**kwargs`) Arguments

You can define all three types of parameters in a function, but you have to do it in this order:

```python
def arg_demo(pos1, pos2, *args, **kwargs):
  print(f'Positional params: {pos1}, {pos2}')
  print('*args:')
  for arg in args:
    print(' ', arg)
  print('**kwargs:')
  for keyword, value in kwargs.items():
    print(f'  {keyword}: {value}')

arg_demo('A', 'B', 1, 2, 3, color='purple', shape='circle')

'''Output:
Positional params: A, B
*args:
  1
  2
  3
**kwargs:
  color: purple
  shape: circle
'''
```

#### Discussion: Printing

Turns out...

* `print` accepts an optional keyword argument: `sep`
* The `sep` value given will be used as a **separator**
* It's optional! Without it, `print` by default uses a space, which is why you haven't seen it
* **This only applies when using commas to separate the arguments for `print`**

```python
print('Hi!', 'Vanilla', 'please,', 'but', 'chocolate', 'is', 'cool.')
#--> Hi! Vanilla please, but chocolate is cool.
print('Hi!', 'Vanilla', 'please,', 'but', 'chocolate', 'is', 'cool.', sep='--')
#--> Hi!--Vanilla,--please,--but--chocolate--is--cool.
```

* `sep` can be any string - but not an int

If we look at the [documentation on `print`](https://docs.python.org/3/library/functions.html#print), we see that the function signature is:

```python
print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)
```

This tells us that `*objects` denotes multiple arguments, while `sep`, `end`, `file`, and `flush` are optional arguments with default values.

(Here, they've chosen to say `*objects` instead of `*args`, it's just another parameter name, after all.)

## Optional Keyword Arguments

In this case where `*args` is the first parameter, all the optional parameter must be keyword arguments!

This won't do what you expect:

```python
print('Will', 'this', 'work?', '---')
#--> Will this work? ---
```

But this will:

```python
print('But', 'this', 'will!', sep='---')
#--> But---this---will!
```

That's because without the keyword `sep`, the unnamed argument will just get shoved into `*args`!

## ❓ Review Questions

Take a moment to review the following questions:

1. **In the following, which line number of code will be the last to execute?**

	<img src="https://i.imgur.com/M6AGssz.png">

2. **Assuming the following function:**

	```python
	def add(a, b):
	  return a + b
	```
	**Which of the following statements will result in an error?<br> (there could be more than one)**
	
	A) `add(10, 100.)` <br>
	B) `add(10, '10')` <br>
	C) `add(100)` <br>
	D) `add('abc', 'def')` <br>
	E) `add(10, 20, 30)` <br>

3. **What "feature" in Python would allow the `add` function above to accept any number of numbers to add together?**


## Key Differences Between Python & JS Functions

Besides the obvious syntactical differences, here are a few other things to be aware of:

### Function expressions do not exist in Python

Functions in Python are defined using the `def` keyword. However, unlike in JavaScript, you cannot define a function in Python by assigning it to a variable:

```python
# This will not work
my_function = def my_function():
  pass
```

### Python does not "hoist" functions

The last key difference between Python and JavaScript functions is that you cannot invoke a Python function before the code that defines it:

```python
# Not allowed until after the code below
add(5, 10)

def add(a, b):
  return a + b
```

### Anonymous/Inline Functions

Python also has the concept of anonymous and/or inline functions - called `lambda`s.

For example:

```js
// JavaScript
const nums = [1, 3, 2, 6, 5];
const add_ten = (n) => { return n + 10 };
const added_nums = nums.map(add_ten);
```
	
```python
# Python
nums = [1, 3, 2, 6, 5]
add_ten = lambda n: n + 10
added_nums = list(map(add_ten, nums))
```

Lambdas are nifty when using Python functions such as `map()` and `filter()` - just like how arrow functions are nifty when using array iterator methods.

By the way the above code can be shortened considerably:

```js
// JavaScript
const nums = [1, 3, 2, 6, 5];
const added_nums = nums.map(n => n + 10);
```
	
```python
# Python
nums = [1, 3, 2, 6, 5]
added_nums = list(map(lambda n: n + 10, nums))
```

`lambda` functions are very much like _Arrow Functions_ in JavaScript:  

- They implicitly return a single expression's result.
- They can be assigned to a variable.

However, they cannot have any code block - only a single expression that has its result implicitly returned.

### Callbacks

Revisiting callbacks in Javascript:

```js
function add(a, b) {
  return a + b;
}

const sub = (a, b) => a - b;

const compute = (a, b, op) => op(a, b);

console.log(compute(1, 2, add));
console.log(compute(1, 2, sub));
```

And yes, Python has the same abilities!

```python
def add(a, b):
  return a + b
  
sub = lambda a, b: a - b

def compute(a, b, op):
  return op(a, b)

print(compute(1, 2, add))
print(compute(1, 2, sub))
```

### Varying number of arguments

Similar to Python's `*args`, in JavaScript, we were able to access "extra" arguments being passed in to a function by using the special keyword `arguments`:

```js
// Using the arguments special variable
function sum() {
  let total = 0;
  for (arg of arguments)
    total += arg;
  return total;
}

console.log(sum(1, 5, 10));  // -> 16
```

Or preferably by using ES2015's **rest parameters**:

```js
function sum(...nums) {
  let total = 0;
  for (num of nums)
    total += num;
  return total;
}

console.log(sum(1, 5, 10));  // -> 16
```

By the way, the previous code can be re-written in a much shorter fashion:

```js
function sum(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 5, 10));  // -> 16
```

## References

[*args and **kwargs in python explained](https://pythontips.com/2013/08/04/args-and-kwargs-in-python-explained/)

