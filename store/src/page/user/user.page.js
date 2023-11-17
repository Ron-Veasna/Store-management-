import React from 'react'
import { Button, Empty } from 'antd';
import "./user.page.css"
import { Flex, Spin } from 'antd';
const User = () => {
  return (
    <div>
      <h1>User page</h1>
      <Empty style={{"font-size":30,}}/>
      <div style={{"margin-left":780, "padding":20}}>
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex></div>
      <Button style={{"margin-left":770}} type="primary">Create Now</Button>
    </div>
  )
}

export default User
