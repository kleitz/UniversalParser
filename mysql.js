var connection;
var mysql =require('mysql');
var _ = require('underscore');
var queryGenerator = require('./query-generator');

module.exports ={
     open:function(host,user,password,database){

          connection = mysql.createConnection({
               host:host,
               user: user,
               password:password,
               database:database
          });

     },

     /*## select(query)==>Promise
           - **query**: an object, possible properties:
           - **table** (required, string): table name
           - **fields** (optional, string or array of strings): fields to return, e. g. ["title", "price"]
           - **limit** (optional, integer): maximum number of records to return
           - **offset** (optional, integer): number of records to skip
           - **order** (optional, string): order, e.g. "name desc"0
           - **where** (optional): `where` object
      - **Promise** => (resolve(rows),reject(error))
           - **error**: error message
           - **rows**: array of rows that match the query
      */
     select:function(query){

          return new Promise(function(resolve,reject){
               if(connection===undefined){
                    reject("Error connection to database");
               }
               connection.connect();
               connection.query(queryGenerator.toSelectQuery(query), function(err,rows){
                    debugger;
                    if(err){
                         reject(err);
                    }else{
                         resolve(rows);
                    }
               });
               connection.end();

          });

     },
     delete:function(){

     },
     insert:function(){

     },
     join:function(){

     }

 };