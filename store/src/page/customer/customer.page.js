import React from 'react'
import "./customer.page.css"
import { RobotOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { useState, useEffect } from 'react';
import axios from "axios"
import Table from 'react-bootstrap/Table';
const url = 'https://static.animecorner.me/2022/07/anya-diary.png';
const url2 = 'https://fictionhorizon.com/wp-content/uploads/2022/07/monkey.png';

const Customer = () => {
  const [List, setList] = useState([])
  useEffect(()=>{
    getlist(); //call function getlist
  },[])
  // create a function fetch data from api
  const getlist = () =>{
    axios({
      url : "http://localhost:8080/api/customer/getlist",
      method : "GET",
      headers: {
        'Content-Type': 'application/json',
        // "Access-Control-Allow-Origin": "*",
        'Accept': 'application/json, text/plain, */*',
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
      },
      //body: JSON.stringify(getlist),
      //data : {} // json body params
    }).then(res=>{
      // setList(res.data.list_customer)
      console.log("res", res);
    }).catch(err=>{
      console.log(err)
    })
  }
  const onDelete = (item)=>{
    axios({
      url : "http://localhost:8080/api/customer/delete",
      method : "DELETE",
      //data : {} // json body params
    }).then(res=>{
      getlist()
    }).catch(err=>{
      console.log(err)
    })
  }
return (
  <>
  <h1>Customer Page <span style={{"color":"blue"}} >Management</span></h1>
  <Space size={16} wrap style={{"margin-bottom":19}}>
    <Avatar size={50} style={{"border":"2px solid white"}} icon={<UserOutlined />} />
    <Avatar size={50} style={{"border":"2px solid white","background-color": "Skyblue"}}>Sna</Avatar>
    <Avatar size={50} style={{"border":"2px solid Yellow","background-color": "hotpink"}}>Ka</Avatar>
    <Avatar size={50} style={{"border":"2px solid white"}} src={url} />
    <Avatar size={50} style={{"border":"2px solid white"}} src={<img src={url2} alt="avatar" />} />
    <Avatar size={50} 
      style={{
        backgroundColor: '#fde3cf',
        color: '#f56a00',
        "border":"2px solid black",
      }}
    >
      Ty
    </Avatar>
    <Avatar size={50}
      style={{
        backgroundColor: '#87d068',
        "border":"2px solid white",
      }}
      icon={<RobotOutlined/>}
    />
  </Space>
  <Table border={1}>
    <thead>
      <tr>
        <th className='td-left'>No</th>
        <th className='td-left'>FirstName</th>
        <th className='td-left'>LastName</th>
        <th className='td-left'>Gender</th>
        <th className='td-left'>Date of Birth</th>
        <th className='td-left'>Phone</th>
        <th className='td-left'>Email</th>
        <th className='td-left'>Is_Active</th>
        <th className='td-left'>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        List.map((item,index)=>{
          return (
            <tr key={index}>
              <td className='td-left'>{index+1}</td>
              <td className='td-left'>{item.firstname}</td>
              <td className='td-left'>{item.lastname}</td>
              <td className='td-left'>{item.gender}</td>
              <td className='td-left'>{item.dob}</td>
              <td className='td-left'>{item.phone}</td>
              <td className='td-left'>{item.email}</td>
              <td className='td-left'>{item.is_active}</td>
              <td>
                <button>Edit</button>
                <button onClick={()=>onDelete(item)}>Delete</button>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </Table>
</>
  )
    }
export default Customer;

