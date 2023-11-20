const express = require('express')
const app = express()
const cors = require('cors');
app.get("/", (req,res)=>{
    res.send("hello api js")
})
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:false}))
//handle route
// app.get('/', (req, res) => {
//     res.send('Hello node js!')
// })
require("./src/route/customer.route")(app)
require("./src/route/user.route")(app)
const port = 8080
app.listen(port,()=>{
    console.log("running http:/localhost:"+port)
    //console.log(`http://localhost:${port}`)
})
