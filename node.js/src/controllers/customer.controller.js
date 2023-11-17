var list = [ "Ron Veasna","Rath Vicheka","Messi"]
const db = require("../config/db.config")
const getlist = (req,res)=>{
    db.query("SELECT * FROM customer", (err,result)=>{
        res.json({
            list_customer : result
        })
    })
}
const create = (req,res)=>{
    var body = req.body
    if(body.firstname == null || body.firstname == ""){
        res.json({
            error: true,
            message: "Please fill in firstname!"
        })
        return false
    }
    if(body.lastname == null || body.lastname == ""){
        res.json({
            error: true,
            message: "Please fill in lastname!"
        })
        return false
    }
    var sqlinsert = "INSERT INTO customer( firstname, lastname, gender, dob, phone, email, is_active) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlinsert,[body.firstname,body.lastname,body.gender,body.dob,body.phone,body.email,body.is_active],(error,result)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message:"customer inserted!",
                data: result
            })
        }
    })
}

const update = (req,res)=>{
    var body = req.body
    if(body.firstname == null || body.firstname == ""){
        res.json({
            error: true,
            message: "Please fill in firstname!"
        })
        return false
    }
    if(body.lastname == null || body.lastname == ""){
        res.json({
            error: true,
            message: "Please fill in lastname!"
        })
        return false
    }
    var sqlupdate = "UPDATE customer SET firstname=?, lastname=?, gender=?, dob=?, phone=?, email=?, is_active=? WHERE cus_id = ?"
    db.query(sqlupdate,[body.firstname,body.lastname,body.gender,body.dob,body.phone,body.email,body.is_active, body.cus_id],(error,result)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else{
            res.json({
                message:"customer Updated!",
                data: result
            })
        }
    })
}
const remove = (req,res)=>{

    db.query("DELETE From customer WHERE cus_id ="+req.params.id,(error,result)=>{
        if(error){
            res.json({
                error: true,
                message: error
            })
        }else if(result.affectedRows !=0){
            res.json({
                message:"customer deleted!",
                data: result
            })
        }else{
            res.json({
                message:"customer not Found!",
                data: result
            })
        }
    })
}

module.exports={
    getlist,
    update,
    create,
    remove
}