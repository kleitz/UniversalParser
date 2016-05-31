var _ = require("underscore");

var Parser = require('node-dbf');
var parser = new Parser('./employee.DBF');


function select(where) {
    var listOfRows =[];

    return new Promise(function (resolve,reject){

        parser.on('record', function (row) {
            if(where===undefined){
                listOfRows.push(row);
            }else if(_.isMatch(row,where)){
                listOfRows.push(row);
            }

        });

        //wWhen the parser reaches the end of the database file
        parser.on('end',function(e){
            resolve (listOfRows);
        });

        parser.parse();
    });
}


select().then(function(listOfRows){
    console.log(listOfRows);
});