const mysql=require('mysql2');

let conn=mysql.createConnection({
    "hostname":"localhost",
    "port":3306,
    "user":"root",
    "password":"root",
    "database":"design"
});

conn.connect(()=>{
    console.log('database connect successfully');
})

module.exports=conn;