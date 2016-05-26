/**
 * Created by neils on 5/19/2016.
 */

var udp = require('./universal-parser.js')({
    location: './data/test2.sqlite',
    dialect: 'sqlite'
});


/*
 select(query)==> promise
 -resolve: function(rows)--> returns rows as array
 -reject: function(error)--> returns ssqlite3 error message
 */
// udp.select({table:'Users',fields:'email',where:{age:"20"}}).then(function(rows){
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

// /*
//  delete(table,where)==> promise
//      -resolve: function(rowsDeleted)--> rowsDeleted is no of elements deleted
//      -reject: function(error)--> error is the number of sqlite3 error message
// //  */
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

udp.join({table1: {name: "general_info", field: "name"}, table2: {name: "login_info", field: "name"}},
          {fields:
}).then(function (rows) {
    console.log(rows);
}, function (error) {
    console.log(error);
});