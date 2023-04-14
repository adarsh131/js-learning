var express = require('express');
 var app = express();
 var mysql = require('mysql');
 var cors = require('cors'); //Cross-Origin Resource Sharing (CORS)
var bodyParser = require('body-parser');
app.use(cors());

//json parser
//var jsonParser = bodyParser.json();
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//url encoded
//var urlencodedparser = bodyParser.urlencoded({extended:false});

 //connection
var con=mysql.createConnection({
   host : "localhost",
   user : "root",
   password : "",
   database : "book"
});
 con.connect(function(err)
 {
    if(err)
    {
        throw err;
    }
    console.log("connected");
 })


 //list book
// new book
// get one book details
//update 
//delete

//http verbs  (get-get a data,post- new data, patch-update,delete-delete data)
 
//..............adding route..................

//all book details 
app.get("/books",function(req,res)
{
  con.query("select * from books",function(err,result,fields)
  {
    if(err)
    {
        throw err;
    }
    else
    {
        res.send(result);
        console.log(result);
    }
  });
 // res.send("response");
});


//get one book details
app.get("/book/:id",function(req,res)
{
    let id = req.params.id;
  con.query("select * from books where id = "+id,function(err,result,fields)
  {
    if(err)
    {
        throw err;
    }
    {
        res.send(result);
    }
  });
});
//add a new book
app.post("/book",function(req,res)
{
   /* let BookTitle = req.body.book_title;
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;
    
    let qr = 'insert into books(book_title,description,author_name,price) values('${BookTitle}','${description}','${author_name}',${price})';*/
    let BookTitle = req.body.book_title;
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;
    
    let qr = 'insert into books(book_title,description,author_name,price) values(?,?,?,?)';
    con.query(qr, [BookTitle, description, author_name, price], function(err, result) {
      if (err) {
          throw err;
      } else {
          res.send(result);
      }
  });
});
//update book
app.patch("/book/:id",function(req,res)
{
  let id = req.params.id;
  let BookTitle = req.body.book_title;
  let description = req.body.description;
  let author_name = req.body.author_name;
  let price = req.body.price;

  let qr = 'UPDATE books SET book_title=?, description=?, author_name=?, price=? WHERE id=?';
  con.query(qr, [BookTitle, description, author_name, price, id], function(err, result) {
      if (err) {
          throw err;
      } else {
          res.send(result);
      }
  });
});

//delete a book
app.delete("/book/:id",function(req,res){
  let id = req.params.id;

    let qr = 'DELETE FROM books WHERE id=?';
    con.query(qr, id, function(err, result) {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    });
});



 app.get("/",function(req,res){

    res.send("<h1>welcome hello</h1>");
 });

 app.listen(9000,function () {
    console.log("server started");
 });