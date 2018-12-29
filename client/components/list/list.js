import React from 'react';
import { List, Avatar, Spin, message, Icon } from 'antd';
import { getList } from '../../model/server';

class ListCop extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }

  componentDidMount() {
    getList().then((res) => {
      this.setState({
        data: res,
      });
    });
  }

  render() {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6,
        }}
        dataSource={this.state.data}
        footer={<div><b>ant design</b> footer part</div>}
        renderItem={item => (
          <List.Item
            key={item.title}
            actions={[<IconText type="star-o" text={item.comments} />, <IconText type="like-o" text={item.supports} />, <IconText type="message" text={item.comments} />]}
            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
              title={<a href={`#/detail?id=${item.id}`}>{item.title}</a>}
            />
            {item.profile}
          </List.Item>
        )}
      >
        {this.state.loading && this.state.hasMore && (
          <div className="demo-loading-container">
            <Spin />
          </div>
        )}
      </List>
    );
  }
}
export default ListCop;