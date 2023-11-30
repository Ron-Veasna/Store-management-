var list = [ "Ron Veasna","Rath Vicheka","Messi"]
const db = require("../config/db.config");
const { Config } = require("../util/service");

const getlist = (req,res)=>{
    // ASC = a-z, DESC = z-a,
    //column ?, order (ASC,DESC) ?
    //var sqlSelect = "SELECT * FROM customer ORDER BY firstname ASC"
    var query = req.query;
    var text_search = query.text_search;
    var page = query.page;
    var sqlSelect = "SELECT * FROM customer "
    if(text_search != null){
      sqlSelect += " WHERE firstname LIKE '%"+text_search+"%' "   
    }
   //sqlSelect += "ORDER BY firstname ASC" //tor string
   //page = page;
    //var limit =7;
    var offset = (page - 1) * Config.pagination;
    sqlSelect += " LIMIT "+offset+","+Config.pagination+" "
//    page 1 => (1-1) * 5 => 0
//    page 2 => (2-1) * 5 => 5
    db.query(sqlSelect, (err,result)=>{
        db.query("SELECT count(cus_id) as total FROM customer",(er1,row1)=>{
          var total_record = row1[0].total
            res.json({
            total_record: total_record,
            pagination : Config.pagination,
          //  total_page: Math.ceil(total_record/Config.pagination),
            list_customer : result  
           })
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
    var sqlinsert = "INSERT INTO customer(firstname, lastname, gender, dob, phone, email, is_active) VALUES (?,?,?,?,?,?,?)"
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