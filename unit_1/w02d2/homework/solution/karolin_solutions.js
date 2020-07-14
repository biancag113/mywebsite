
// ==============================================


// Easy Going
// 1. Write a for loop that will log the numbers 1 through 20.

// for (let i = 1; i <= 20; i++){
//   console.log(i);
// };

// ==============================================

// Get Even
// 1. Write a for loop that will log only the even numbers in 0 through 200.

// for (let i = 0; i <= 200; i++) {
//   if (i % 2 === 0){
//     console.log(i);
//   }
// };
//
// //or
//
// for (let i = 0; i <= 200; i+=2) {
//   console.log(i);
// };

// ==============================================


// Fizz Buzz
// 1. Write a javascript application that logs all numbers from 1 - 100.
// 2. If a number is divisible by 3 log "Fizz" instead of the number.
// 3. If a number is divisible by 5 log "Buzz" instead of the number.
// 4. If a number is divisible by 3 and 5 log "FizzBuzz" instead of the number.

// for (let i = 1; i <= 100; i++){
//   if (i % 3 === 0 && i % 5 === 0) {
//     console.log(i, "FizzBuzz");
//   } else if (i % 3 === 0) {
//     console.log(i, "Fizz");
//   } else if (i % 5 === 0) {
//     console.log(i, "Buzz");
//   // } else {
//   //   console.log(i, "This number is not divisible by 3 or 5.");
//   }
// };


// ==============================================

// Wild Wild Life

// Use the following arrays to answer the questions below (name,species ,age, hometown):
// const wolfy = ["Wolfy", "wolf", 16, "Yukon Territory"];
// const sharky = ["Sharky", "shark", 20, "Left Coast"];
// const plantee = ["Plantee", "plant",  5000 , "Mordor"];
// const porgee = ["Porgee", "Porg", 186, "Ahch-To"];
// const dart = ["D'Art" , "Demogorgan Dog", 2, "Upside Down"];

//Plantee just had her birthday; change Plantee's array to reflect her being a year older.

// plantee[2] += 1;

//Change Wolfy's hometown from "Yukon Territory" to "Gotham City".

// wolfy[3] = "Gotham City";

//Give D'Art a second hometown by adding "Hawkins"
// dart.push("Hawkins");

//Porgee decides that Wolfy can't be named "Wolfy" anymore. Remove "Wolfy" from the wolfy array and replace it with "Gameboy".
// wolfy.shift();
// wolfy.unshift("Gameboy");

// ==============================================

// Yell at the Ninja Turtles

// Create an array with the members of the ninja turtles (Donatello, Leonardo, Raphael, Michaelangelo)

// Use a for of loop (not a typo - try it out! Try a for of loop) to call toUpperCase() on each of them and print out the result.
// const ninjaTurtle = ["Donatello", "Leonardo", "Raphael" , "Michaelangelo"];

// for (turtle of ninjaTurtle) {console.log(turtle.toUpperCase())};

// ==============================================

// Favorite Movies with Methods Revisited

// const favMovies = ['Jaws', 'The Fellowship of the Ring', 'Howl\'s Moving Castle', 'Django Unchained', 'Cloud Atlas', 'The Usual Suspects', 'Toy Story', 'Conan the Barbarian', 'Titanic', 'Harry Potter', 'Fried Green Tomatoes', 'Volver', 'Oculus', 'Seven', 'Black Panther', 'Harry Potter', 'Imitation of Life', 'Snatch', 'Fast and Furious'];

// // Console log: the index of Titanic
// console.log(favMovies.indexOf('Titanic'))
//
// // use the .sort method Thought question: what did this do to the array? Did it permanently alter it?
// favMovies.sort();
// // Use the method pop
// favMovies.pop();
// // push "Guardians of the Galaxy"
// favMovies.push("Guardians of the Galaxy");
// // Reverse the array
// favMovies.reverse();
// // Use the shift method
// favMovies.shift();
// // unshift - what does it return?
// favMovies.unshift("Hackers");
// // splice "Django Unchained" and add "Avatar" (try finding the index of "Django Unchained", instead of counting it yourself) Thought question: did this permanently alter our array?
// favMovies.splice(favMovies.indexOf("Django Unchained"), 1, "Avatar");
// // slice the last half of the array (challenge yourself and try to programatically determine the middle of the array rather than counting it and hard coding it) - Thought question: did this permanently alter our array?
// const sliceHalfMovies = favMovies.slice(Math.floor(favMovies.length/2), favMovies.length);
// console.log(sliceHalfMovies);
// // store the value of your slice in a variable, console.log it - Thought question: what is going on here?
// // console.log your final results
//
// console.log(favMovies);

// ==============================================
// const whereIsWaldo = [["Timmy", "Frank"], "Eggbert",
//                     ["Lucinda", "Jacc", "Neff", "Snoop"],
//                     ["Petunia", ["Baked Goods", "Waldo"]]];


// Remove Eggbert (hint look at the slice/splice method(s))
// whereIsWaldo.splice(1,1)
// console.log(whereIsWaldo);
//
// // Change "Neff" to "No One"
// whereIsWaldo[1][2] = "No One";
// console.log(whereIsWaldo[1][2]);
//
// // Access and console.log "Waldo"
// console.log(whereIsWaldo[2][1][1]);

// ==============================================

// Excited Kitten
// 1. White code that logs "Love me, pet me! HSSSSSS!" 20 times.

// 2. For every even number in your loop, log "...human...why you taking pictures of me?...", "...the catnip made me do it...", or "...why does the red dot always get away..." at random.

//const catTalk = ["...human...why you taking pictures of me?...", "...the catnip made me do it...", "...why does the red dot always get away..." ];


//for (let i = 0; i < 20; i++){
  // access the three array items - need 0 , 1 , 2
  // minimum: 0
  // maximum: catTalk.length // value of 3 with our current array
 // console.log("Love me, pet me! HSSSSSSSS");
//  if ( i % 2 === 0 ){
//    let talkingPoints = Math.floor(Math.random()* (catTalk.length));
//    console.log(catTalk[talkingPoints]);
//  }
//}

// ==============================================

//

// Find the Median
// - Find the median number in the following `nums` array, then console.log that number.
// -  _hint_ if you check the length of the array / 2, you might get not get a whole number. In which case, look into `Math.floor( // something )`

// To calculate the median of any set of numbers, you need to write the numbers in order. If there is an odd number of results, the median is the middle number. If there is an even number of results, the median will be the mean of the two central numbers.

// const nums = [14,11,16,15,13,16,15,17,19,11,12,14,19,11,15,17,11,18,12,17,12,71,18,15,12];
//
// // Expected output:
// // => 15
//
// let median = 0;
//
// // Sort the array to get the numbers in ascending order
// nums.sort();
// console.log("Nums array after sort: " + nums);
// console.log("Length of nums array: " + nums.length);
// // If the array has an ODD number of elements
// median = nums[Math.floor(nums.length/2)];
// console.log('median (expected 15): ', median);

// If the array has an even or odd number of elements
// if (nums.length % 2 === 0){
//   const middleIndex1 = Math.floor((nums.length-1)/2);
//   console.log('middleIndex1', middleIndex1);
//   const middleIndex2 = Math.ceil((nums.length-1)/2);
//   console.log('middleIndex2', middleIndex2);
//   median = (nums[middleIndex1] + nums[middleIndex2])/2;
// } else {
//   median = nums[Math.floor(nums.length/2)];
// }
//
// console.log('median (expected 15): ', median);



// ==============================================
// Finbonnaci
// Finbonnaci (part 1 - break down into smaller pieces)

// const fibonacciNumbers = [];
//
// let fibonacciNumber = 0;
// let currentNumber = 1;
// let lastNumber = 0;
//
// while (fibonacciNumber < 4000000) {
//   // get the number which is the sum of the last number and current number
//   fibonacciNumber =  lastNumber + currentNumber;
//   // push the number into the array
//   fibonacciNumbers.push(fibonacciNumber);
//   // last num has to equal current num
//   lastNumber = currentNumber
//   // current Num has to equal fib num
//   currentNumber = fibonacciNumber
// }
//
// console.log(fibonacciNumbers);

// ==============================================
// Finbonnaci Even Sums

// const fibonacciNumbers = [];
//
// let fibonacciNumber = 0;
// let currentNumber = 1;
// let lastNumber = 0;
//
// while (fibonacciNumber < 4000000) {
//   // get the number which is the sum of the last number and current number
//   fibonacciNumber =  lastNumber + currentNumber;
//   // if the number is even, push the number into the array
//   if(fibonacciNumber % 2 ===  0) {
//     fibonacciNumbers.push(fibonacciNumber);
//   }
//   // last num has to equal current num
//   lastNumber = currentNumber
//   // current Num has to equal fib num
//   currentNumber = fibonacciNumber
// }

// // sum the even numbers
// let fibonacciSum = 0;
// for (let num of fibonacciNumbers){
//   fibonacciSum += num;
// }
//
// console.log(fibonacciSum);

// ==============================================
// Checkerboard

// const gridSize = 20

// for (let i = 0; i < gridSize/2; i++) {
//   if(i % 2  === 0){
//     console.log(' #'.repeat(gridSize/2))
//   } else {
//     console.log('# '.repeat(gridSize/2))
//   }
// }


// OR


//
// for (let i = 0; i < gridSize/2; i++) {
//   let row = ''
//   // generate a row
//   if (i % 2 === 0) {
//     for (let j = 0; j < gridSize; j++ ) {
//       if (j % 2 === 0 ){
//         row += ' '
//       } else {
//         row += '#'
//       }
//     }
//   } else  {
//     for (let j = 0; j < gridSize; j++ ) {
//       if (j % 2 === 0 ){
//         row += '#'
//       } else {
//        row += ' '
//       }
//     }
//   }
//    console.log(row)
// }

// ==============================================


// Two D Array

// const twoDArray = [
//   [9,8,7],
//   [6,5,4],
//   [3,2,1],
// ];
//
// const singleArr = [];
//
// twoDArray.reverse();
//
// for (let arr of twoDArray) {
//   arr.reverse()
//   for (let num of arr) {
//     singleArr.push(num)
//   }
// }
//
// console.log(singleArr);

// ==============================================

// Spiral Array

 // Test Cases

//  const a =
//   [
//     [1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]
//   ]
//
// const b = [
//       [ 1,  2,  3,  4,  5,  6],
//       [18, 19, 20, 21, 22,  7],
//       [17, 28, 29, 30, 23,  8],
//       [16, 27, 26, 25, 24,  9],
//       [15, 14, 13, 12, 11, 10]
//     ]
//
// const c = [
//       [ 1,  2,  3,  4,  5,  6,  7,  8,  9, 10],
//       [36, 37, 38, 39, 40, 41, 42, 43, 44, 11],
//       [35, 64, 65, 66, 67, 68, 69, 70, 45, 12],
//       [34, 63, 84, 85, 86, 87, 88, 71, 46, 13],
//       [33, 62, 83, 96, 97, 98, 89, 72, 47, 14],
//       [32, 61, 82, 95, 100, 99, 90, 73, 48, 15],
//       [31, 60, 81, 94, 93, 92, 91, 74, 49, 16],
//       [30, 59, 80, 79, 78, 77, 76, 75, 50, 17],
//       [29, 58, 57, 56, 55 ,54, 53, 52, 51, 18],
//       [28, 27, 26, 25, 24, 23, 22, 21, 20, 19]
//    ]
//
// const e = [
//       [1,2],
//       [4,3]
//     ]
//
// const f = [
//       [1,2,3,4],
//       [8,7,6,5]
//     ]
//
// const g = [
//       [1, 2],
//       [10,3],
//       [9, 4],
//       [8, 5],
//       [7, 6]
//     ]
//
// const h = [
//       [1,2,3,4]
//     ]
//
// // Helper Function
// // change columns to rows, rows to columns
// const transpose = a => {
//   return Object.keys(a[0]).map(c =>
//      a.map( r => r[c])
//   )
// }
//
// // Helper Function
// // flatten the array
// const flatten = a => {
//   return a.reduce((acc, val) => acc.concat(val), []);
// }
//
// // Spiral
//
// const printSpiral = matrix => {
//   uncurled = []
//   while (matrix.length){
//     uncurled.push(matrix.shift())
//     if(matrix.length > 0){
//         matrix = transpose(matrix).reverse()
//     }
//   }
//   flatten(uncurled).forEach(item => console.log(item))
// };
//
// printSpiral(a)
// printSpiral(b)
// printSpiral(c)
// printSpiral(e)
// printSpiral(f)
// printSpiral(g)
// printSpiral(h)
