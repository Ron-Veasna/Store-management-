import React from 'react'
import "./customer.page.css"
import axios from 'axios';
import { request } from '../../util/Api';
import { 
  Button, 
  DatePicker, 
  Input, 
  Modal, 
  Popconfirm,
  ConfigProvider,
  Select,
  Radio,
  Spin,
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
import { message, Table } from 'antd/lib';
const url = 'https://static.animecorner.me/2022/07/anya-diary.png';
const url2 = 'https://fictionhorizon.com/wp-content/uploads/2022/07/monkey.png';
const { Option } = Select;
const Customer = () => {
  const [List, setList] = useState([])
  const [visibleModal, setVisibleModal] = useState(false)
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [gender, setGender] = useState("Please Select Gender")
  const [dob, setDob] = useState(dayjs())
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [is_active, setActive] = useState(1)
  const [cus_id, setCusid] = useState(null)
  const [loading, setLoading] = useState(false)
  const getlist = () =>{
    setLoading(true)
    request("get","customer/getlist").then(res=>{
      setList(res.data.list_customer)
      setTimeout(() => {
        setLoading(false) // fast sever jeg ot see loading  
      }, 300);
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  // const getlist = async () =>{
  //   const response = await fetch('http://localhost:8080/api/customer/getlist')
  //   const data = await response.json();
  //   setList(data.list_customer)
  //   console.log(data);
  // }//https://www.googleapis.com/books/v1/volumes?q=flowers
  useEffect(() => {

    getlist();
  

  }, [])
  const onConfirmDelete = (id) => {
    // axios({
    //   url : "http://localhost:8080/api/customer/delete/"+id,
    //   method : "DELETE",
    // }).then(res=>{
    //   getlist()
    // }).catch(err=>{
    //   console.log(err)
    // })
    setLoading(true)
    request("delete","customer/delete/"+id).then(res=>{
      getlist()
      setTimeout(() => {
        setLoading(false) // fast sever jeg ot see loading  
      }, 300);
      message.success(res.data.message)
    }).catch(err=>{
      console.log(err)
    })
  }
  const handlesubmit =()=>{
    if(cus_id == null){
      setLoading(true)
      request("post","customer/create",{
        "firstname":firstname,
        "lastname":lastname,
        "gender":gender,
        "dob":dayjs(dob),
        "phone":phone,
        "email":email,
        "is_active":is_active,
    //   })
    // axios({
    //   url : "http://localhost:8080/api/customer/create",
    //   method : "post",
    //   headers: {
    //      Content-Type: application/json
    //      }
    //   data :{
    //     "firstname":firstname,
    //     "lastname":lastname,
    //     "gender":gender,
    //     "dob":dayjs(dob),
    //     "phone":phone,
    //     "email":email,
    //     "is_active":is_active,
    //   }
     }).then(res =>{
      setVisibleModal(false)
      clearForm()
      getlist()
      setTimeout(() => {
        setLoading(false) // fast sever jeg ot see loading  
      }, 300);
      message.success(res.data.message)
    }).catch(err=>{
      console.log(err);
    })
}else{
  setLoading(true)
  request("put","customer/update",{
       "cus_id": cus_id,
       "firstname":firstname,
       "lastname":lastname,
       "gender":gender,
       "dob":dayjs(dob),
       "phone":phone,
       "email":email,
       "is_active":is_active,
  // axios({
  //   url : "http://localhost:8080/api/customer/update",
  //   method : "put",
  //   data :{
  //     "cus_id": cus_id,
  //     "firstname":firstname,
  //     "lastname":lastname,
  //     "gender":gender,
  //     "dob":dayjs(dob),
  //     "phone":phone,
  //     "email":email,
  //     "is_active":is_active,
  //   }
  }).then(res =>{
    setVisibleModal(false)
    getlist()
    clearForm();
    message.success(res.data.message)
    setTimeout(() => {
      setLoading(false) // fast sever jeg ot see loading  
    }, 300);
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
  <Spin spinning={loading}>
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
  <Table
    columns={[
      {
        title : "No",
        render : (value, record, index)=>(index+1)
      },
      {
        title : "FirstName",
        dataIndex : "firstname",
        key : "firstname",
      },
      {
        title : "LastName",
        dataIndex : "lastname",
        key : "lastname",
      },
      {
        title : "Gender",
        dataIndex : "gender",
        key : "gender",
        render : (value) => (value === 1 ? <button size='small' className='blue' >Male</button>:<button size='small' className='pink'>Female</button>)
      },
      {
        title : "Date of Birth",
        dataIndex : "dob",
        key : "dob",
        render : (value) => (dayjs(value).format("DD/MM/YYYY"))
      },
      {
        title : "Phone",
        dataIndex : "phone",
        key : "phone",
      },
      {
        title : "Email",
        dataIndex : "email",
        key : "email",
      },
      {
        title : "Is_Active",
        dataIndex : "is_active",
        key : "is_active",
        render : (value) => (value === 1 ? <button size='small' className='green' >Active</button>:<button size='small' className='red'>Disable</button>)
      },
      {
        title : "Action",
        render : (record,index) => (
          <Space>
            <Button  size='small' type='primary'
                onClick={()=>handleEdit(record,index)}>
                <EditFilled/>Edit
                </Button>
                <Popconfirm
                  placement="topRight"
                  title={"Delete Customer"}
                  description={"Are you sure Delete this Customer"}
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={()=>onConfirmDelete(record.cus_id)}
                  okText="Delete"
                  cancelText="No"
                >
                <Button danger={true} size='small' 
                >
                <DeleteFilled/>Delete
                </Button>
                </Popconfirm>
          </Space>
        )
      },
    ]}
    dataSource={List}
  />
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
  </Spin>
</>
  )
    }
export default Customer;

