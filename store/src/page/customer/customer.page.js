import React from 'react'
import "./customer.page.css"
import axios from 'axios';
import { 
  Button, 
  DatePicker, 
  Input, 
  Modal, 
  Popconfirm,
  ConfigProvider,
  Select,
  Radio,
 } from 'antd';
 import dayjs from "dayjs";
// import 'dayjs/locale/km';
// import locale from 'antd/es/date-picker/locale/km_KH';
import "dayjs/locale/en";
import locale from "antd/locale/en_US";
import { RobotOutlined, UserOutlined, SaveFilled} from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import {
  DeleteFilled,
  EditFilled, 
  QuestionCircleOutlined , 
  FilterFilled} from "@ant-design/icons"
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
const url = 'https://static.animecorner.me/2022/07/anya-diary.png';
const url2 = 'https://fictionhorizon.com/wp-content/uploads/2022/07/monkey.png';
const { Option } = Select;
const Customer = () => {
  const [List, setList] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDob] = useState(dayjs())
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [is_active, setActive] = useState(1)
  const [cus_id, setCusid] = useState(null)
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
  const handlesubmit =()=>{
    if(cus_id == null){
    axios({
      url : "http://localhost:8080/api/customer/create",
      method : "post",
      data :{
        "firstname":firstname,
        "lastname":lastname,
        "gender":gender,
        "dob":dayjs(dob),
        "phone":phone,
        "email":email,
        "is_active":is_active,
      }
    }).then(res =>{
      setVisibleModal(false)
      getlist()
    }).catch(err=>{
      console.log(err);
    })
}else{
  axios({
    url : "http://localhost:8080/api/customer/update",
    method : "put",
    data :{
      "cus_id": cus_id,
      "firstname":firstname,
      "lastname":lastname,
      "gender":gender,
      "dob":dayjs(dob),
      "phone":phone,
      "email":email,
      "is_active":is_active,
    }
  }).then(res =>{
    setVisibleModal(false)
    getlist()
  }).catch(err=>{
    console.log(err);
  })
}
}
  const handlecloseModal =() =>{
    setVisibleModal(false)
    clearForm();
    setCusid(null)
  }
  const clearForm = () => {
    setFirstname("");
    setLastname("");
    setGender("1");
    setDob(dayjs());
    setPhone("");
    setEmail("");
    setActive(1);
    setCusid(null);
  };
  const handleOpenModal =()=>{
    setVisibleModal(true)
  }
  const handleEdit = (item,index)=>{
    setVisibleModal(true)

    setFirstname(item.firstname)
    setLastname(item.lastname)
    setGender(item.gender+"")
    setDob(item.dob+"")
    setPhone(item.phone)
    setEmail(item.email)
    setActive(item.is_active)
    setCusid(item.cus_id)
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
  <Button type='primary' className='date'><FilterFilled/>Filter</Button>
  </Space>
  </div>
  <Button onClick={handleOpenModal} style={{"background-color":"rgb(14, 216, 14)","color":"white","border":" 1px solid black"}}>
  <SaveFilled/>Create Customer
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
                <Button  size='small' type='primary'
                onClick={()=>handleEdit(item,index)}>
                <EditFilled/>Edit
                </Button>
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
  <Modal
    open={visibleModal}
    title={cus_id == null ? "New Customer":"Update Customer"}
    onCancel={handlecloseModal}
    onOk={()=>{}}
    footer={null}
  > <br/>
  <div className='input'>
    <Input
      value={firstname}
      placeholder="First-Name"
      onChange={(event)=>{
        setFirstname(event.target.value)
      }}
     />
     <Input
      value={lastname}
      placeholder="Last-Name"
      onChange={(event)=>{
        setLastname(event.target.value)
      }}
     />
      <Select
              value={gender}
              defaultValue={"1"}
              style={{ width: "100%" }}
              onChange={(value) => {
                setGender(value);
              }}
            >
            <Option value={""}>Please Gender</Option>
              <Option value={"1"}>Male</Option>
              <Option value={"0"}>Female</Option>
            </Select>
            <ConfigProvider locale={locale}>
              <DatePicker
                style={{ width: "100%" , "margin":"20px 0px"}}
                placement="bottomLeft"
                placeholder="Date of birth"
                format={"DD/MM/YYYY"} // user client
                value={dayjs(dob, "YYYY-MM-DD")} // for date picker
                onChange={(date_js, dateString) => {
                  setDob(date_js);
                }}
              />
            </ConfigProvider>
     <Input
      value={phone}
      placeholder="Phone Number"
      onChange={(event)=>{
        setPhone(event.target.value)
      }}
     />
     <Input
      value={email}
      placeholder="Your Email"
      onChange={(event)=>{
        setEmail(event.target.value)
      }}
     />
      <Radio.Group
              value={is_active}
              onChange={(event) => {
                setActive(event.target.value);
              }}
            >
              <Radio value={1}>Actived</Radio>
              <Radio value={0}>Disabled</Radio>
            </Radio.Group>
    </div> <br/>
    <Space style={{"display":"flex", "justifyContent":"right"}}>
      <Button danger={true} onClick={handlecloseModal}>Cancel</Button>
      <Button onClick={handlesubmit} type='primary'>{cus_id == null ? "Save":"Update"}</Button>
    </Space>
  </Modal>
</>
  )
    }
export default Customer;

