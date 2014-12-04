var mysql  = require('mysql');
var colors = require('colors');
var bodyParser = require('body-parser');
var express = require('express')
var app = express()

app.use(bodyParser());





var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'weblab',
  database : 'weblab'
});


connection.connect();

app.set('view engine', 'ejs');




app.post('/insert', function(req, res){
    
    connection.query("INSERT INTO  `weblab`.`Employees`  \
        (                           \
            `id` ,                  \
            `name`                  \
            )                       \
            VALUES (                \
            NULL ,  '"+ req.body.name +"'          \
            );",function(err, result){
                    if(err){
                        res.send('insert error');
                    }
                    else{ 
                        res.send('hey it worked');
                        }

            })
    });


app.get('/', function (req, res) {
        connection.query('select * from `Employees`', function(err, employees, fields){
                
                if(err){ 
                    console.log("Mysql Select Query ERROR!".red, err);
                    res.send(500, "error");
                }
                else {
                    res.render('employee', {employees: employees });
                    console.log("It Worked!".green, employees);
                }
        })
  

})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})













