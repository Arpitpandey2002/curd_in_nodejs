const mysql = require('mysql');

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hospital',
    // port:'3306'
});

con.connect((err)=>{
        if(err) throw err;
        console.log("Connection created successfully ");
});

module.exports = con;