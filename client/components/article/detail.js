import React from 'react';
import {
  Comment, Icon, Tooltip, Avatar, message,
} from 'antd';
import moment from 'moment';
import UserComment from './comment';

export default class ArticleDetail extends React.Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null,
    data: null
  }

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  }

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  }

  componentDidMount() {
    // 路由相关属性值， history location match
    // console.log(this.props);
    // search="?id=itemID1"
    const aId = this.props.location.search.split('=')[1];
    const self = this;

    fetch(`http://localhost:3000/api/getDetail?id=${aId}`, {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
    }).then(res => res.json())
      .catch(err => {
        message.error('请求错误');
      }).then(res => {
        res.code == 200 ? self.setState({ data: res.data }) : message.error(res.msg);
      });
  }

  render() {
    const { likes, dislikes, action, data } = this.state;

    const actions = [
      <span>
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {likes}
        </span>
      </span>,
      <span>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>
          {dislikes}
        </span>
      </span>,
      <span>Reply to</span>,
    ];

    return (
      <div style={{ width: 700, margin: 'auto' }}>
        <Comment
          actions={actions}
          author={<a>Han Solo</a>}
          avatar={(
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          )}
          content={(
            <p>{data && data.profile}</p>
          )}
          datetime={(
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment().fromNow()}</span>
            </Tooltip>
          )}
        />
        <UserComment />
      </div>
    );
  }
}

