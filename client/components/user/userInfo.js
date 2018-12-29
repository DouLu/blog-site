import React from 'react';
import { Card, Icon, Avatar, message } from 'antd';

const { Meta } = Card;

export default class UserInfo extends React.Component {
  state = {
    data: null
  }
  componentDidMount() {
    const self = this;
    fetch('http://localhost:3000/api/getUserInfo', {
      method: 'POST',
      body: JSON.stringify({ nickname: window.localStorage.nickname }),
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    }).then(res => res.json())
      .catch(res => {
        message.error('请求报错');
      }).then(res => {
        res.code == 200 ? self.setState({ data: res.data }) : message.error(res.msg);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{ paddingTop: 45, paddingLeft: 20 }}>
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={data && data.nickname}
            description={data && data.email}
          />
        </Card>
      </div>
    );
  }
}