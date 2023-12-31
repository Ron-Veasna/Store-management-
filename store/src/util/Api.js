import axios from "axios"
import { message } from "antd"
const baseUrl = "http://localhost:8080/api/"

export const request = (method="",url="",data={}) => {
    var token = "ahfdashfklas"
    return axios({
        url : baseUrl + url,
        method : method,
        data : data,
        // headers: {'Content-type': 'multipart/form-data'},
    }).then(res=>{
        
        return res
    }).catch(err=>{
        if(err.code == "ERR_NETWORK"){
            message.error("Can not connect to server. Please contact Sna!")
            return false
        }
        return false
    })
}