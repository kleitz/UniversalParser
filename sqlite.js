/**
 * Created by neils on 5/19/2016.
 *
 * Version 1: Connect to an existing sqlite database and make changes to it using sqlite3.
 */


/*
 select(query, callback)
 - **query**: an object, possible properties:
 - **table** (required, string): table name
 - **fields** (optional, string or array of strings): fields to return, e. g. ["title", "price"]
 - **limit** (optional, integer): maximum number of records to return
 - **offset** (optional, integer): number of records to skip
 - **order** (optional, string): order, e.g. "name desc"
 - **where** (optional): `where` object

 It is also possible to pass a query string instead of a query object, `connection.select('select distinct category from records', ...)`.

 - **callback** - (error, rows)
 - **error**: `sqlite3` error
 - **rows**: array of rows that match the query
 */
var db;
var _ = require('underscore');
var queryGenerator = require('./sql-query-generator');


module.exports = {
    open: function (path) {
        db = require('sqlite3-wrapper').open(path)
    },
    /*## select(query)==>Prommise
    
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
    select: function (query) {
        return new Promise(function (resolve, reject) {
            if (db === undefined) {
                reject('Database not connected');
            } else {
                db.select(query, function (error, rows) {
                    if (error === null) {
                        resolve(rows);
                    } else {
                        reject(error);
                    }
                });
            }
        });
    },
    insert: function (table, row) {
        return new Promise(function (resolve, reject) {
            if (db === undefined) {
                reject('Database not connected');
            } else {
                db.insert(table, row, function (error, id) {
                    if (error === null) {
                        resolve(id);
                    } else {
                        reject(error);
                    }
                });
            }
        });
    },
    delete: function (table, where) {
        return new Promise(function (resolve, reject) {
            if (db === undefined) {
                reject('Database not connected');
            } else {
                db.delete(table, where, function (error, rowsDeleted) {
                    if (error === null) {
                        resolve(rowsDeleted);
                    } else {
                        reject(error);
                    }
                });
            }
        });
    },
    update: function (table, where, row) {
        return new Promise(function (resolve, reject) {
            if (db === undefined) {
                reject('Database is not connected');
            } else {
                db.update(table, where, row, function (error, updatedRows) {
                    if (error === null) {
                        resolve(updatedRows);
                    } else {
                        reject(error);
                    }
                });
            }
        });

    },
    /*
    ## join(joinParams,queryParams)
    - **joinParams**: an object with following required properties
         - **table1** (required,object)
                -**name**(required,string)
                -**field**(required,string)
         - **table2** (required,object)
                -**name**(required,string)
                -**field**(required,string)
    - **query**: an object, possible properties:
         - **fields** (optional, string or array of strings): fields to return, e. g. ["title", "price"]
         - **limit** (optional, integer): maximum number of records to return
         - **offset** (optional, integer): number of records to skip
         - **order** (optional, string): order, e.g. "name desc"0
         - **where** (optional): `where` object

    It is also possible to pass a query string instead of a query object, `connection.select('select distinct category from records', ...)`.

    - **Promise** - (resolve(rows), reject(error))
         - **error**: `sqlite3` error
         - **rows**: array of rows that match the query
    */
    join: function(joinParams, selectParams) {

        var selectParams = selectParams||{};    //test if selectParams is undefined
        var queryString='';

        return new Promise(function(resolve,reject){

            if (db === undefined) {
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

                    db.database().serialize(function(){
                        db.database().all(queryString,function(error,rows){
                           if(error===null){
                               resolve(rows);
                           }else{
                               reject(error);
                           }
                        });
                    });
                }

            }else{
                reject('First argument in select must be either a string or an object')
                return
            }
            
        });
    }
};