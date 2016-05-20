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

 It is also possible to pass a query string instead of a query object, `db.select('select distinct category from records', ...)`.

 - **callback** - (error, rows)
 - **error**: `sqlite3` error
 - **rows**: array of rows that match the query
 */

module.exports.open = function (path) {
    return require('sqlite3-wrapper').open(path);
};

module.exports.select = function (db, query) {
    return new Promise(function (resolve, reject) {
        db.select(query, function (error, rows) {
            if (error === null) {
                resolve(rows);
            } else {
                reject(error);
            }
        });
    });
}

