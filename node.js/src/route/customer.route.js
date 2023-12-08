const controllercustomer = require("../controllers/customer.controller")
const customer = (app) =>{
    app.get("/api/customer/getlist",controllercustomer.getlist)
    app.post("/api/customer/create",controllercustomer.create)
    app.post("/api/customer/login",controllercustomer.login)
    app.put("/api/customer/update",controllercustomer.update)
    app.get("/api/customer/get-cart",controllercustomer.getCart)
    app.delete("/api/customer/delete/:id",controllercustomer.remove)
    app.get("/api/customer/getlist",(req,res)=>{
        res.send("get list customer")
    })
    // app.get("/api/customer/create",(req,res)=>{
    //     res.send("create customer")
    // })
    // app.get("/api/customer/update",(req,res)=>{
    //     res.send("update customer")
    // })
    // app.get("/api/customer/delete",(req,res)=>{
    //     res.send("delete customer")
    // })
}

module.exports = customer