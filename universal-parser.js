var db;
var universalParser;

module.exports = function(dbInfo){
    if(dbInfo.dialect === 'sqlite'){
        db = require('./sqlite.js');
        db.open(dbInfo.location);
        return db;
    }
}