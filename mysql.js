var connection;
var mysql =require('mysql');
var queryGenerator = require('./sql-query-generator');

module.exports ={
     open:function(connectionParams){
          connection = mysql.createConnection(connectionParams);
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
                    if(err){
                         reject(err);
                    }else{
                         resolve(rows);
                    }
               });
               connection.end();
          });

     },
     delete:function(table,where){
          return new Promise(function (resolve, reject) {
               if (connection === undefined) {
                    reject('Database not connected');
               } else {

                    connection.query("DELETE FROM "+table+" WHERE "+queryGenerator.toWhereString(where),function(err,rows){
                         debugger;
                         if(err){
                              reject(err);
                         }else{
                              resolve(rows);
                         }
                    });

               }
          });
     },
     update: function (table, where, row) {
          return new Promise(function (resolve, reject) {
               if (connection === undefined) {
                    reject('Database not connected');
               } else {

                    connection.query("UPDATE "+table+" SET ? WHERE "+queryGenerator.toWhereString(where),row,function(err,rows){
                         debugger;
                         if(err){
                              reject(err);
                         }else{
                              resolve(rows);
                         }

                    });

               }
          });
     },
     insert: function (table, row) {
          return new Promise(function (resolve, reject) {
               if (connection === undefined) {
                    reject('Database not connected');
               } else {
                    connection.query("INSERT INTO "+table+" set ?",row,function(err,rows){
                         if(err){
                              reject(err);
                         }else{
                              resolve(rows);
                         }
                         
                    });
                    
               }
          });
     },
     join: function(joinParams, selectParams) {

          var selectParams = selectParams||{};    //test if selectParams is undefined
          var queryString='';

          return new Promise(function(resolve,reject){

               if (connection === undefined) {
                    reject("Database not connected");
                    return
               }
               if (typeof joinParams === 'string') {
                    queryString = joinParams;
               }else if (typeof joinParams === 'object') {
                    //joinParams is mandatory
                    if((joinParams.table1.name&&joinParams.table2.field&&joinParams.table2.name&&joinParams.table2.field)===undefined){
                         reject("Missing Parameters in joinParams object");
                    }else {
                         queryString = queryGenerator.toJoinQuery(joinParams,selectParams);
                         var queryOptions = {sql: queryString, nestTables: '_'};
                         connection.query(queryOptions,function(err,rows){
                              if(err){
                                   reject(err);
                              }else{
                                   resolve(rows);
                              }
                         });
                    }

               }else{
                    reject('First argument in select must be either a query string or an object');
               }

          });
     }

 };