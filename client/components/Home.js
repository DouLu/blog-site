import React from 'react';
import './style.css';
import { Tabs } from 'antd';
import ListCop from './list/list';
import UserInfo from './user/userInfo';

const TabPane = Tabs.TabPane;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: null,
    }
  }

  render() {
    return (
      <div className="container">
        <div className="content border">
          <div className="left-con border">
            <Tabs defaultActiveKey="1" animated={false}>
              <TabPane tab="Tab 1" key="1">
                <ListCop />
              </TabPane>
              <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
              <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
          </div>
          <div className="right-con border">
            <UserInfo />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;