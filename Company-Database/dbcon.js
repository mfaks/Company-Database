var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_faksm',
  password        : 'N8C81ZXwc0Nq',
  database        : 'cs340_faksm'
});
module.exports.pool = pool;
