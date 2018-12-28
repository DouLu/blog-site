import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, message,
} from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.loading('login . . .');
        fetch('http://localhost:3000/api/login', {
          method: 'POST',
          body: JSON.stringify({ data: values }),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          })
        }).then(res => res.json())
          .catch(res => {
            message.error('请求出错');
          }).then(res => {
            if (res.code == 200) {
              window.location.href = 'http://localhost:3000/home/';
            } else {
              message.warning(res.msg);
            }
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ width: 600, margin: 'auto' }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="nickname" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;