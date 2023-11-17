*init node
>npm init

> node index.js

*install mysql
> npm install mysql

const mysql = require("mysql")
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecmsna_kh_db"
})
app.get("/", (req,res)=>{
    db.query("SELECT * FROM customer", (err,result)=>{
        res.json({
            list:result
        })
    })
})

*install nodemon
> npm install nodemon

*install express
> npm install express