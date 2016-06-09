var _ = require("underscore");
var Parser;
var parser;


module.exports = {
    open: function (path) {
        Parser = require('node-dbf');
        parser = new Parser(path);
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
            var rows = [];
            parser.on('record', function (record) {

                if (_.isObject(query) === false) {              //if query object does not exist add all records to list
                    rows.push(record);
                    reject("Query must be an object");
                } else if (_.isObject(query.where) === false) {  //if query.where does add all records to list
                    filterByFields();
                } else if (_.isMatch(record, query.where)) {     //if query.where exists, find matching records
                    filterByFields();
                }

                //if fields parameter is specified, return record with matching fields
                function filterByFields() {
                    if (_.isString(query.fields)) {
                        rows.push(_.pick(record, query.fields.split(' ')));
                    } else {
                        rows.push(record);
                    }
                }
            });
            parser.on('end', function (e) {
                var limit = ((query && query.limit) || rows.length);        //if query.limit is not specified set it to length of rows
                var offset = ((query && query.offset) || 0);                //if query.offset is not mentioned set it to 0

                limit = ((limit + offset < rows.length)) ? limit + offset : rows.length; //ensure that arrayIndex is not out of bounds if limit is greater than length
                rows = rows.slice(0 + offset, limit);                      //return limit
                rows = _.sortBy(rows, query && (query.order));               //sort by query.order if it exists
                resolve(rows);
            });
            parser.parse(); //start parsing

        });
    },
    /*
     ## join(joinParams,queryParams)
     - **joinParams**: an object with following required properties
     - **file1** (required,object)
     -**name**(required,string)
     -**field**(required,string)
     - **file2** (required,object)
     -**name**(required,string)
     -**field**(required,string)
     -  **query**: an object, possible properties:
     - **fields** (optional, string or array of strings): fields to return, e. g. ["title", "price"]
     - **limit** (optional, integer): maximum number of records to return
     - **offset** (optional, integer): number of records to skip
     - **order** (optional, string): order, e.g. "name desc"0
     - **where** (optional): `where` object

     It is also possible to pass a query string instead of a query object, `db.select('select distinct category from records', ...)`.

     - **Promise** - (resolve(rows), reject(error))
     - **error**: `sqlite3` error
     - **rows**: array of rows that match the query
     */
    join: function (joinParams) {
        return new Promise(function(resolve,reject){
            var recordSet =[];
            var recordSet2 =[];

            parser.on('record',function(record){
                recordSet2.push(record);

            });
            parser.on('end',function(e){

                var joinParser = new Parser(joinParams.path);

                joinParser.on('record',function(record){
                    recordSet2.push(record);
                });

                joinParser.on('end',function(){
                    //Both the arrays are full
                    resolve(joinArrays(recordSet2,recordSet2,field1,field2));

                });

            });
            parser.parse();
        });
    }


}

function join(array1,array2,property1,property2){
    //given 2 arrays of objects and property names return new array
    var joinedArray=[];
    
    for(var i =0;i<array1.length;i++){
        //find in array2 where array1[property1] =array2[]
    }
}