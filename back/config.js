const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // address of the server
user :  'admin', // username
password :  'Jecode4wcs!',
database :  'jamusic',
});
module.exports = connection;