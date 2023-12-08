var list = [ "Ron Veasna","Rath Vicheka","Messi"]
const db = require("../config/db.config");
const { Config } = require("../util/service");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_access_token = "EUYG3725623#FJDS"
var dataCards = [
    {
        id:11,
        name:"Coka",
        color:"red",
        cus_id:1
    },
    {
        id:12,
        name:"Pepsi",
        color:"blue",
        cus_id:2
    },
    {
        id:13,
        name:"Fanta",
        color:"Orange",
        cus_id:3
    },
    {
        id:17,
        name:"Spy",
        color:"Black",
        cus_id:60
    }
]
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

const getCart = (req,res)=>{
    var authorization = req.headers.authorization;
    var token_from_client = null
    if(authorization != null && authorization != ""){
        token_from_client = authorization.split(" ")
        token_from_client = token_from_client[1]
    }
   if(token_from_client == null){
    res.json({
        error : true,
        message : "You don't have permission access this method!"
    })
   }else{
    jwt.verify(token_from_client,secret_access_token,(err,data)=>{
        if(err){
            res.json({
                error : true,
                message : "Invalid Token!"
            })
        }else{
            var cus_id = data.profile.cus_id
            // dataCart = []
            //"SELECT * FROM carts where customer = cus_id"
            var cart = dataCards.filter((item,index)=>item.cus_id == cus_id)
            res.json({
                cart : cart,
                // cus_id : cus_id
                // data : data.profile.cus_id,
                // token : token_from_client
            }) 
        }
    })
   }
}

const create = (req,res)=>{
    // get parameter from client site
    // var password = "1234"
    // var bcrypt_password = bcrypt.hashSync(password,10) // store in db
    // // compare password
    // var paramPassword = "1234"
    // var isCorrect = bcrypt.compareSync(paramPassword,bcrypt_password)
    // res.json({
    //     password : password,
    //     bcrypt_password : bcrypt_password,
    //     isCorrect : isCorrect
    // })
    // return

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
    // username = email or phone
    if(body.username == null || body.username == ""){
        res.json({
            error: true,
            message: "Please fill in username!"
        })
        return false
    }else{
        //username is email or phone
        //ifEmail username store in column eamil
        //ifphone username store in column phone
    }

    if(body.password == null || body.password == ""){
        res.json({
            error: true,
            message: "Please fill in Password!"
        })
        return false
    }
// check when inset customer
    db.query("SELECT * FROM customer WHERE email = ?",[body.username],(err,result)=>{
        if(err){
            res.json({
                error: true,
                message: err
            })
        }else{
            if(result.length == 0){
                //can create new Account
                var password = bcrypt.hashSync(body.password,10)
                var sqlinsert = "INSERT INTO customer(firstname, lastname, gender, dob, email, password, is_active) VALUES (?,?,?,?,?,?,?)"
                db.query(sqlinsert,[body.firstname, body.lastname, body.gender, body.dob, body.username, password, body.is_active],(error,result)=>{
                    if(error){
                        res.json({
                            error: true,
                            message: error
                        })
                    }else{
                        res.json({
                            message:"Customer inserted!",
                            data: result
                        })
                    }
                })
            }else{
                //Can not create new Account
                res.json({
                    error: true,
                    message: "Account Already exist!"
                })
            }
        }
    })
}
    const login = (req,res) =>{
        // var username = req.body.username;
        // var password = req.body.password;
        var{username,password} = req.body     //this one laor jeang tea doch knea
        if(username == null || username == ""){
            res.json({
                error : true,
                message : "Please fill in username!",
            })
            return
        }else if(password == null || password == ""){
            res.json({
                error : true,
                message : "Please fill in password!",
            })
            return
        }

        db.query("SELECT * FROM customer WHERE email = ?",[username],(err,result)=>{
            if(err){
                res.json({
                    error : true,
                    message : err
                })
            }else{
                if(result.length == 0){
                    res.json({
                        error :true,
                        message : "User Dode not exist. Please Register!"
                    })
                }else{
                    var data = result[0]
                    var passwordInDb = data.password;
                    var isCorrectPassword = bcrypt.compareSync(password,passwordInDb) // true or false
                    if(isCorrectPassword){
                        delete data.password;
                        var token = jwt.sign({profile:data},secret_access_token)
                        res.json({
                            message : "Login Success!",
                            profile : data,
                            token : token 
                        })
                    }else{
                        res.json({
                            message : "Incorrect Password!"
                        })
                    }
                }
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
        }else{

        if(result.affectedRows !=0){
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
    }
    })
 }


module.exports = {
    getlist,
    update,
    create,
    remove,
    login,
    getCart
}