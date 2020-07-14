// ========================================================
//                      PALINDROME
// ========================================================
const checkPalindrome = (string) => {
  // reverse the string by...
    // lower casing the string
    // splitting the string into an array of its individual letters
    // reverse the array
    // join the array
  const reversedString = string.toLowerCase().split('').reverse().join('')
  // if the reversedString is the same as the passed in string.
  if(reversedString === string.toLowerCase()) {
    // it's a palindrome
    return true
  }
  // if not, it's not a palindrome
  return false
}

console.log(checkPalindrome('hello world')) // => false 
console.log(checkPalindrome('racecar')) // => true

// ========================================================
//                      SUM ARRAY
// ========================================================
const sumArray = (arr) => {
  // defining default sum variable
  let sum = 0
  // loop through the array and add to sum
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum
}

console.log(sumArray([1, 2, 3, 4, 5, 6])) // => 21

// ========================================================
//                      PRIME NUMBERS
// ========================================================
// check if a given number is prime
const checkPrime = (num) => {
  // loop from 2 to the square root of the number
  for(let i = 2; i <= Math.sqrt(num); i++) {
    // if the number is evenly divisible by the current loop
    if (num % i === 0) {
      // that means the number is NOT prime, so return false to terminate the loop
      return false
    }
  }
  // if the for loop never returns false, it's not evenly divisible by any number  from 2 to the square root, so it must be prime
  return true
}

console.log(checkPrime(25)) 

// print all the primes within a given range
const printPrimes = (limit) => {
  // loop from 0 up to the given limit
  for(let i = 0; i <= limit; i++) {
    // use our checkPrime function to check if the current loop is prime
    if(checkPrime(i)) {
      // if it is, log the number
      console.log(i)
    }
  }
}

printPrimes(98)

// ========================================================
//                   ROCK PAPER SCISSORS
// ========================================================
// random move
const randomMove = () => {
  // define array of moves
  const moveArray = ['rock', 'paper', 'scissors']
  // generate a random number
  const randomNum = Math.floor(Math.random() * (moveArray.length))
  console.log(randomNum)
  // return a random move
  return moveArray[randomNum]
}

// run a round of the game
let computersMove = randomMove()
let usersMove = randomMove()

const rockPaperScissors = (computersMove, usersMove) => {
  // show computer move
  console.log('computer chose ', computersMove)
  // show user move
  console.log('user chose ', usersMove)
  // check who won
  if(computersMove === usersMove) {
    console.log('played the same move, tie!');
  } else if(computersMove === 'rock') {
      if(usersMove === 'paper') { console.log('paper beats rock, user wins') }
      else if(usersMove === 'scissors') { console.log('rock beats scissors, computer wins') }
  } else if(computersMove === 'paper') {
      if(usersMove === 'rock') { console.log('paper beats rock, computer wins') }
      else if(usersMove === 'scissors') { console.log('scissors beats rock, user wins') }
  } else {
      if(usersMove === 'rock') { console.log('rock beats scissors, user wins') }
      else if(usersMove === 'paper') { console.log('scissors beats paper, computer wins') }
  }
}

rockPaperScissors(computersMove, usersMove)

// ========================================================
//              HUNGRY FOR MORE: DIGIT SUM
// ========================================================
const sumDigits = (num) => {
  // defining default sum variable
  let sum = 0
  // split the number into individual digits by...
    // turning it into a string
    // splitting it into an array
  let splitNum = num.toString().split('')
  // loop through the array and add to sum
  for(let i = 0; i < splitNum.length; i++) {
    sum += parseInt(splitNum[i])
  }
  return sum
}

console.log(sumDigits(42))

// ========================================================
//              HUNGRY FOR MORE: PYTHAGORAS
// ========================================================
// pythagoras theorem is a^2 + b^2 = c^2
// just simulate that using the Math.sqrt and Math.pow methods to find c
const calculateSide = (sideA, sideB) => {
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2))
}

console.log(calculateSide(8, 6))

// ========================================================
//              HUNGRY FOR MORE: TRIANGLES
// ========================================================
const rightTriangle = (num) => {
  // initialize triangle
  let triangle = ''
  // vertical loop
  for(let i = 0; i < num; i++) {
    triangle += '#'
    console.log(triangle);
  }
}

rightTriangle(7)

// ========================================================
//             HUNGRY FOR MORE: SECOND NUMBERS
// ========================================================
const secondNumbers = (arr) => {
  // first, sort the array
  arr.sort()
  // then return the second numbers
  return {
    "second highest": arr[arr.length-2],
    "second lowest": arr[1]
  }
}

console.log(secondNumbers([4,2,6,9,1]));

// ========================================================
//             HUNGRY FOR MORE: UNIQUE STRING
// ========================================================
const returnUniqueString = (str) => {
  // default unique string variable
  let uniqueString = ''
  // splitting the string and sorting it in alphabetical order
  let splitString = str.toLowerCase().split('')
  // loop through the split string
  for(let i = 0; i < splitString.length; i++) {
    // default dupe variable, set to assume dupe is false
    let dupe = false
    // loop through the split string from the beginning to the current iteration
    for(let j = 0; j < i; j++) {
      // if current iteration equals any of the previous, it's a dupe
      if(splitString[i] === splitString[j]) {
        dupe = true
      }
    }
    // after inner for loop, if dupe is still false, add the letter to the unique string
    if(!dupe) {
      uniqueString += splitString[i]
    }
  }
  return uniqueString
}

console.log(returnUniqueString('hello'));

// ========================================================
//             HUNGRY FOR MORE: INSERT DASH
// ========================================================
const insertDash = (num) => {
  // split the number into individual digits by...
    // turning it into a string
    // splitting it into an array
  let splitNum = num.toString().split('')
  // loop through split numb array
  for(let i = 0; i < splitNum.length; i++) {
    // if the number is odd AND not the last number, add a dash after it
    if(splitNum[i] % 2 !== 0 && i !== splitNum.length-1) {
      splitNum[i] += '-'
    }
  }
  // return the splitNum array joined into a string
  return splitNum.join('')
}

console.log(insertDash(454793))
