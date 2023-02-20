const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : conf.host,
    user: conf.user,
    password : conf.password,
    port: conf.port,
    database : conf.database
})

connection.connect();

const multer = require('multer');
//upload폴더를 사용자의 파일을 업로드하는 공간으로 만듬
const upload = multer({dest: './upload'});


app.get('/api/customers',(req,res)=>{
    connection.query (
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})
//upload폴더 공유 (사용자입장에서는 image 폴더라고 보여짐)
app.use('/image',express.static('./upload'));

//upload.single -> API에 image변수에 넣어있는 바이너리 값을 받아옴
//filename은 multer가 중복되지않게 해줌
app.post('/api/customers',upload.single('image'),(req,res)=>{
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?,?,?,?,?)';
    let image = '/image/' +req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;

    let params = [image,name,birthday,gender,job];
    connection.query(sql,params,
        (err,rows,fields) =>{
            res.send(rows);
        }
    );
});

app.listen(port,()=> console.log(`Listening on port ${port}`));