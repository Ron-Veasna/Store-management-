
const user = (app) =>{
    app.get("/api/user/getlist",(req,res)=>{
        res.send("get list user")
    })
    app.get("/api/user/create",(req,res)=>{
        res.send("create user")
    })
    app.get("/api/user/update",(req,res)=>{
        res.send("update user")
    })
    app.get("/api/user/delete",(req,res)=>{
        res.send("delete user")
    })
}

module.exports = user