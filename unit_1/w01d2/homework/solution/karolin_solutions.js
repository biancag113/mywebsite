// const a = 4;
// const b = 53;
// const c = 57;
// const d = 16;
// const e = 'Kevin';

// console.log('Name' === 'Name');
//
//
// let runProgram = true;
//
// while (runProgram) {
// 	console.log('Do not run this loop');
// 	runProgram = false;
// }

//
// let letters = "A";
// let i = 0;
//
// while (i < 20) {
// 	letters += "A";
// 	i++;
// }
//
// console.log(letters);




const StarWars = ["Han", "C3PO", "R2D2", "Luke", "Leia", "Anakin"];

// longhand i + 2
// i = i + 2
// shorthand postfix operator
// i += 2

for (let i = 0; i < StarWars.length; i = i + 2 ){
  console.log(StarWars[i] + " " + i);
}
