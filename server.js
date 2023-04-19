var express = require('express');
 var app = express();
 var mysql = require('mysql');
 var cors = require('cors'); //Cross-Origin Resource Sharing (CORS)
var bodyParser = require('body-parser');
app.use(cors());
var jwt=require('jsonwebtoken');
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
//middlewere
function verifytoken(req,res,next)
{
  let authheader=req.headers.authorization;
  if(authheader==undefined)
  {
    res.status(401).send({error:"no token provided"});
  }
  let token=authheader.split(" ")[1];
  jwt.verify(token,"sceret",function(err,decoded)
  {
    if(err)
    {
      res.status(500).send({error:"authenticatin failed"});
    }
    else{
      //res.send(decoded);
      next();
    }
  })
}



//login route




app.post("/login",function(req,res)
{
  if(req.body.username==undefined || req.body.password==undefined)
  {
    res.status(500).send({error:"authentication failed"});
  }
  let username=req.body.username;
  let password=req.body.password;
  let qr=` select display_name from users where username='${username}' and password=sha1('${password}') `;
con.query(qr,function(err,result)
{
  if(err || result.length==0)
  {
    res.status(500).send({error:"ther is no such a user"});
  }
  else{
   // res.status(200).send({sucess:"welcome"});
   let resp={
    id:result[0].id,
    display_name:result[0].display_name
   }
   let token=jwt.sign(resp,"sceret",{expiresIn:60});
   res.status(200).send({auth:true,token:token});
  }
  
  
})

})




//all book details 
app.get("/books",verifytoken,function(req,res)
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
    let BookTitle = req.body.book_title;
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;
    
    let qr = `insert into books(book_title,description,author_name,price) values('${BookTitle}','${description}','${author_name}',${price})`;
    /*let BookTitle = req.body.book_title;
    let description = req.body.description;
    let author_name = req.body.author_name;
    let price = req.body.price;*/
    
  //  let qr = 'insert into books(book_title,description,author_name,price) values(?,?,?,?)';
    con.query(qr, function(err, result) {
      if (err) {
          throw err;
      } else {
          res.send(result);
      }
  });
});
//update book
app.patch("/book",function(req,res)
{
  
  let BookTitle = req.body.book_title;
  let description = req.body.description;
  let author_name = req.body.author_name;
  let price = req.body.price;
  let id = req.body.id;

  let qr = `update books set book_title='${BookTitle}', description='${description}', author_name='${author_name}', price=${price} where id = ${id}`;
  con.query(qr,  function(err, result) {
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