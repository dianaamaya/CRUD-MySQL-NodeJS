const mysql = require('mysql');
//to allow async/await
const { promisify } = require('util'); 

//we get de database object
const { database } = require('./keys'); 

//handle tasks in sequence
const pool = mysql.createPool(database);
//when we connect to the db, we can get err or connection
pool.getConnection((err, connection) => {
    if (err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIOS')
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }

    if(connection) connection.release();
    console.log('DB is connected');
    return;
    
});

//every time that i request somethig from database, we will use async/await instead of callback
pool.query = promisify(pool.query);
//export connection 
module.exports = pool; 