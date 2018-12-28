import React from 'react';
import './style.css';
import { Popover, Button } from 'antd';

class HeaderCop extends React.Component {
  render() {
    const content = (
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    );
    return (
      <div className="content-box header-box border">
        <div style={{ width: 694 }}>
          <div>
            <a href="/">首页</a>
            <a href="/">发现</a>
            <a href="/">话题</a>
          </div>
          <div>
            <input type="search" placeholder="搜索" />
            <Button type="primary">提问</Button>
          </div>
        </div>
        <div>
          <Popover content={content} title="Title" trigger="click">
            <Button type="primary">Hover me</Button>
          </Popover>
          <Popover content={content} title="Title" trigger="click">
            <Button type="primary">Hover me</Button>
          </Popover>
          <Popover content={content} title="Title" trigger="click">
            <Button type="primary">Hover me</Button>
          </Popover>
        </div>
      </div>
    );
  }
}

export default HeaderCop;