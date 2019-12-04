const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // address of the server
user :  'admin', // username
password :  'wildcodeschool',
database :  'jamusic',
});
module.exports = connection;