var mysql = require('mysql');
var connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
      logging:console.log,
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: 'Oliver',
=======
    password: '',
>>>>>>> f49acf489d9689df6c318067023316a8aa46457f
    database: 'tutors_db'
});
}

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

module.exports = connection;