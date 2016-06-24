//---------------------------------------SQLite-------------------------------------

// var udp = require('./universal-parser.js')({
//     location: './data/test2.sqlite',
//     dialect: 'sqlite'
// });
//
// udp.select({table:'general_info',fields:'name',where:{age:"20"}}).then(function(rows){
//     console.log(rows);
// },function(errors){
//     console.log(errors);
// });
//
// /*
//  insert(table,row)==> promise
//      -resolve: function(id)--> returns id of element inserted
//      -reject: function(error)--> returns ssqlite3 error message
// */
// udp.insert('Users',{email:'neilsanghrajka@outlook.com',age:'20'}).then(function(id){
//     console.log('Row inserted at id '+id);
// },function(erorr){
//     console.log(error);
// });
//
// /*
//  delete(table,where)==> promise
//      -resolve: function(rowsDeleted)--> rowsDeleted is no of elements deleted
//      -reject: function(error)--> error is the number of sqlite3 error message
// */
// udp.delete('Users').then(function (rowsDeleted) {
//     console.log('No of rows deleted: '+rowsDeleted);
// },function (error) {
//     console.log(error);
// })
//
// /*
//  update(table,where,row)==> promise
//      -resolve: function(rowsUpdated)--> rowsUpdated is no of elements deleted
//      -reject: function(error)--> error is the number of sqlite3 error message
//  */
// udp.update('Users',{age:'20'},{email:'neils95@bu.edu'}).then(function(rowsUpdated){
//     console.log(rowsUpdated);
// },function(error){
//     console.log(error);
// });
//
// var join ={
//     table1:{
//         name:"login_info",
//         field:"name"
//     },
//     table2:{
//         name:"general_info",
//         field: "name"
//     }
// }
//
// var select ={fields:"username, password"}
//
// udp.join(join, select).then(function(rows){
//     console.log(rows);
// },function(error){
//     console.log(error)
// });

//----------------------------------------dbf---------------------------------------
/*
 var parser = require('./universal-parser.js')({
 location: './data/employee.DBF',
 dialect: 'dbf'
 });

 var query = {fields: "EMP_NO EMP_NAME2   EMP_STREET"};

 parser.select(query).then(function( record){
 console.log(record);
 },function(error){
 console.log(error);
 });

 var joinParams={
 path:"./data/employee2.DBF",
 field1:"EMP_NO",
 field2:"EMP_NO"
 };

 var rows=[];
 parser.join(joinParams);
 */

//---------------------------------------MYSQL---------------------------------------
var connection = require('./universal-parser.js')({
    dialect: 'mysql',
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'articles'
});

// connection.select({
//     table: "articles"
// }).then(function (rows) {
//     console.log(rows);
// }, function (err) {
//     console.log(err);
// });

// connection.insert(
//     "articles",{
//         author:"Alisha Darara",
//         title:"ios tutorial",
//         body:"testing insert"
//     }
// ).then(function(rows){
//     console.log(rows);
// },function(err){
//     console.log(err);
// });

// connection.delete(
//     "articles",{
//         author:"Alisha Darara",
//         title:"ios tutorial",
//     }
// ).then(function(rows){
//     console.log(rows);
// },function(err){
//     console.log(err);
// });
//
// connection.update(
//     "articles",
//     {author: 'Alex Booker',id:2},
//     {title: "updated title2"}
// ).then(function (rows) {
//     console.log(rows);
// }, function (err) {
//     console.log(err);
// });

connection.join({
        table1:{
            name:"articles",
            field:"author"
        },
        table2:{
            name:"books",
            field:"author"
        }
    }
).then(function(rows){
    console.log(rows);
},function(err){
    console.log(err);
});
