/*
implement join. return record at a time using callback or return entire thing?

need:
    location of dbf file 1
    location of dbf file 2
    values to compare in dbf file 1
    value to compare in dbf file 2

query:
    same parameters as before
// */
//
//
// Parser = require('node-dbf');
// parser = new Parser('./../data/employee.DBF');
//
// parser.on("record",function(record){
//
//     testParser = new Parser('./../data/employee2.DBF');
//     testParser.on("record",function(loginRecord){
//         if(record.EMP_NAME2==loginRecord.EMP_NAME2 && record.EMP_NAME2!=''){
//                 console.log(record.EMP_NAME2);
//             }
//     });
//     testParser.parse();
//
// });
//
// parser.parse();
//
// var _ = require('underscore');
// var a ={name:"neil"};
// var b ={age:20};
//
// console.log(_.extend(a,b));

var async = require('async');

