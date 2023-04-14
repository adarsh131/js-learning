var mysql = require('mysql');
var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "airbus" 
});
con.connect(function(err)
{
    if(err)
    {
        throw err;
    }
    console.log('connected');
    let insert = "insert into cab values(2,'google')";
     con.query(insert,function(err)
     {
        if(err)
        {
            throw err;
        }
        console.log("inserted sucessfully");
     })
})