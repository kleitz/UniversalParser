/*

 This file contains functions essential for query generation using objects.

 */

var _ = require("underscore");

module.exports = {
    toSelectQuery: function (selectParams) {
        var fieldsString = (selectParams.fields || '*');

        var whereString = (((this.toWhereString(selectParams.where) && " WHERE ") + (this.toWhereString(selectParams.where)) ) || '');

        var orderString = (((selectParams.order && " ORDER BY ") + selectParams.order ) || '');

        var limitString = (((selectParams.limit && " LIMIT ") + selectParams.limit) || '');

        var offsetString = (((selectParams.offset && " OFFSET ") + selectParams.offset ) || '');

        var queryString = "SELECT " + fieldsString +
            " FROM " + selectParams.table +
            whereString +
            orderString +
            limitString +
            offsetString;

        return queryString;
    },
    toJoinQuery: function (joinParams, selectParams) {
        /*
         "SELECT ${fieldsString}
         FROM ${table1.name}
         INNER JOIN ${table2.name }
         ON ${joinString}
         WHERE ${whereString}
         ORDER BY ${orderString}
         LIMIT &{limitString}
         OFFSET ${offsetString}
         */
        var fieldsString = (selectParams.fields || '*');
        var joinString = joinParams.table1.name + "." + joinParams.table1.field + "=" +
            joinParams.table2.name + "." + joinParams.table2.field;
        var whereString = (((this.toWhereString(selectParams.where) && " WHERE ") + (this.toWhereString(selectParams.where)) ) || '');

        var orderString = (((selectParams.order && " ORDER BY ") + selectParams.order ) || '');

        var limitString = (((selectParams.limit && " LIMIT ") + selectParams.limit) || '');

        var offsetString = (((selectParams.offset && " OFFSET ") + selectParams.offset ) || '');

        var queryString = "SELECT " + fieldsString +
            " FROM " + joinParams.table1.name +
            " INNER JOIN " + joinParams.table2.name +
            " ON " + joinString +
            whereString +
            orderString +
            limitString +
            offsetString;

        return queryString;
    },
    toInsertQuery: function (table, row) {
        var insertQueryString = "INSERT INTO " + table + "(";
        var insertRowArray = _.pairs(row);
        for (var i = 0; i < insertRowArray.length - 1; i++) {
            insertQueryString += insertRowArray[i][0] + ",";
        }
        insertQueryString += insertRowArray[i][0] + ") VALUES (";
        for (var i = 0; i < insertRowArray.length - 1; i++) {
            insertQueryString += insertRowArray[i][1] + ",";
        }
        insertQueryString += insertRowArray[i][0] + ")";

        return insertQueryString;
    },
    toWhereString: function (where) {
        if (where === undefined || _.isEmpty(where)) {
            return undefined;
        }
        var whereArray = _.pairs(where);
        var whereString = '';
        for (var i = 0; i < whereArray.length - 1; i++) {
            whereString += whereArray[i][0] + "=" + "\'" + whereArray[i][1] + "\' AND ";
        }
        return whereString + whereArray[i][0] + "=" + "\'" + whereArray[i][1] + "\'";
    }
}



