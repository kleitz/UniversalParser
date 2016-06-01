// var _ = require("underscore");
//
// var Parser = require('node-dbf');
// var parser = new Parser('./../data/employeee.DBF');
//
// parser.on('record', function (row) {
//     console.log(row);
// });
//
// //wWhen the parser reaches the end of the database file
// parser.on('end',function(e){
//     console.log("Ended");
// });
//
// debugger;
// parser.parse();


// function select(where) {
//     var listOfRows =[];
//
//     return new Promise(function (resolve,reject){
//
//         parser.on('record', function (row) {
//             if(where===undefined){
//                 listOfRows.push(row);
//             }else if(_.isMatch(row,where)){
//                 listOfRows.push(row);
//             }
//
//         });
//
//         //wWhen the parser reaches the end of the database file
//         parser.on('end',function(e){
//             resolve (listOfRows);
//         });
//
//         parser.parse();
//     });
// }
//
//
// select().then(function(listOfRows){
//     console.log(listOfRows);
// });
//
//
// var list=[];
// // console.log(list);
//
// var a ={name:"alisha"};
// var b= {name:"neil"};
//
// var a = a||b;
// console.log(a);
//
// a="My name is neil"
// console.log(a.split(' '));

// var _= require("underscore");
// var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// console.log(_.sortBy(stooges, undefined&&"age"));

// console.log(5<undefined);
//
// var fruits = ["neil","alisha","disha","beena"];
// console.log(fruits.slice(0,fruits.length));
