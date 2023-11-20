import React from 'react'
import "./customer.page.css"
import axios from 'axios';
import { Button, DatePicker, Input, Popconfirm } from 'antd';
import { RobotOutlined, UserOutlined, SaveFilled} from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import {DeleteFilled, EditFilled, QuestionCircleOutlined , FilterFilled} from "@ant-design/icons"
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
const url = 'https://static.animecorner.me/2022/07/anya-diary.png';
const url2 = 'https://fictionhorizon.com/wp-content/uploads/2022/07/monkey.png';

const Customer = () => {
  const [List, setList] = useState([])
  const getlist = async () =>{
    const response = await fetch('http://localhost:8080/api/customer/getlist')
    const data = await response.json();
    setList(data.list_customer)
    console.log(data);
  }//https://www.googleapis.com/books/v1/volumes?q=flowers
  useEffect(() => {

    getlist();

  }, [])
  const onConfirmDelete = (id) => {
    axios({
      url : "http://localhost:8080/api/customer/delete/"+id,
      method : "DELETE",
    }).then(res=>{
      getlist()
    }).catch(err=>{
      console.log(err)
    })
  }
return (
  <>
 <div className='l'>
  <div>
  <Space>
  <h1>Customer Page <span style={{"color":"blue"}} >Management</span></h1>
  <Input.Search className='search' placeholder='Search'/>
  <DatePicker className='date'  />
  <DatePicker className='date'  />
  <Button type='primary' className='date'><FilterFilled/></Button>
  </Space>
  </div>
  <Button style={{"background-color":"rgb(14, 216, 14)","color":"white","border":" 1px solid black"}}>
  <SaveFilled/>Add Customer
  </Button>
 </div>
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
  
  <Table border={1} style={{width:"100%", "backgroundColor":"white","padding":5}}>
    <thead>
      <tr style={{"backgroundColor":"black", "color":"white"}}>
        <th className='td-left'>No</th>
        {/* <th className='td-left'>Customer ID</th> */}
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
            <tr key={index} >
              <td>{index+1}</td>
              {/* <td>{item.cus_id}</td> */}
              <td>{item.firstname}</td>
              <td>{item.lastname}</td>
              <td>{item.gender}</td>
              <td>{item.dob}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.is_active}</td>
              <td style={{"padding":5,"display":"flex", "gap":20,"justify-content":"center"}}>
              <Popconfirm
                  placement="topRight"
                  title={"Edit Customer"}
                  description={"Are you sure Edit this Customer"}
                  icon={<QuestionCircleOutlined style={{ color: 'blue' }} />}
                  // onConfirm={onConfirmEdit(item.cus_id)}
                  okText="Edit"
                  cancelText="No"
                >
                <Button  size='small' type='primary'>
                <EditFilled/>Edit
                </Button>
                </Popconfirm>
                <Popconfirm
                  placement="topRight"
                  title={"Delete Customer"}
                  description={"Are you sure Delete this Customer"}
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={()=>onConfirmDelete(item.cus_id)}
                  okText="Delete"
                  cancelText="No"
                >
                <Button danger={true} size='small' 
                >
                <DeleteFilled/>Delete
                </Button>
                </Popconfirm>
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

