// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./../data/test2.sqlite',function(error){
//     if(error===null){
//        console.log("Created table");
//     }else{
//         console.log(error);
//     }
// });
//
// //If we are doing evrything in series wrap it in db.serialize
//
// db.serialize(function () {
//    db.all("SELECT gender,username FROM general_info INNER JOIN login_info ON general_info.name=login_info.name",function(error,rows){
//        if(error===null){
//            console.log(rows);
//        }else{
//            console.log(error);
//        }
//    });
// });
//

// var _ = require('underscore');
// function generateWhereString(where){
//     if(where ===undefined || _.isEmpty(where)){
//         return undefined;
//     }
//     var whereArray = _.pairs(where);
//     var whereString ='';
//     for (var i =0;i<whereArray.length-1;i++){
//         whereString+=whereArray[i][0]+"="+whereArray[i][1]+",";
//     }
//     return whereString+whereArray[i][0]+"="+whereArray[i][1];
// }
//
// var where ={
//     NAME:"NEIL",
//     AGE:25,
//     WEIGHT:60
// }
//
//
// var a =(((generateWhereString(where) &&  "WHERE") + generateWhereString(where) )|| '');


a ={name:"neil"};
b= {};

console.log(a||b);

