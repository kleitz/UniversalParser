/**
 * Created by neils on 5/19/2016.
 */

var sqlite = require ('./sqlite.js');
var db =sqlite.open('./database.sqlite');

sqlite.select(db,query).then(function(row){
    console.log(row);
},function(error){
    console.log(error);
});
