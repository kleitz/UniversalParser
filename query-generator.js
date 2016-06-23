/*

This file contains functions essential for query generation using objects.

 */

var _=require("underscore");

module.exports ={
    toSelectQuery : function (selectParams){
        debugger;
            var fieldsString =(selectParams.fields||'*');

            var whereString = (((generateWhereString(selectParams.where) &&  " WHERE ") + (generateWhereString(selectParams.where)) )|| '');

            var orderString = (((selectParams.order &&  " ORDER BY ") + selectParams.order )|| '');

            var limitString =(((selectParams.limit &&  " LIMIT ") + selectParams.limit)|| '');

            var offsetString =(((selectParams.offset &&  " OFFSET ") + selectParams.offset )|| '');

            var queryString = "SELECT "+fieldsString +
                " FROM " +selectParams.table +
                whereString +
                orderString +
                limitString +
                offsetString;

            return queryString;
        }
}


function generateWhereString(where){
    if(where ===undefined || _.isEmpty(where)){
        return undefined;
    }
    var whereArray = _.pairs(where);
    var whereString ='';
    for (var i =0;i<whereArray.length-1;i++){
        whereString+=whereArray[i][0]+"="+"\'"+whereArray[i][1]+"\',";
    }
    return whereString+whereArray[i][0]+"="+"\'"+whereArray[i][1]+"\'";
}
