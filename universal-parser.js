var db;
var universalParser;

module.exports = function(dbInfo){
    if(dbInfo.dialect === 'sqlite'){
        db = require('./sqlite.js');
        db.open(dbInfo.location);
        return db;
    }else if(dbInfo.dialect==='dbf'){
        db=require('./dbf.js');
        db.open(dbInfo.location);
        return db;
    } else if(dbInfo.dialect==='mysql'){
        db=require('./mysql.js');
        db.open(dbInfo.host,dbInfo.user,dbInfo.password,dbInfo.database);
        return db;
    }
}