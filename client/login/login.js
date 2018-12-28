import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Select } from 'antd';
import './style.css';
const { Option } = Select;

class PhotoNumber extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    console.log('______static getDerivedStateFromProps');
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      number: value.number || 0,
      currency: value.currency || 'rmb',
    };
  }

  handleNumberChange = (e) => {
    const number = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ number });
    }
    this.triggerChange({ number });
  }

  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Select
          value={state.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="rmb">RMB</Option>
          <Option value="dollar">Dollar</Option>
        </Select>
        <Input
          type="text"
          size={size}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
          onBlur={this.onBlur}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="手机号"
        />
      </span>
    );
  }
}
class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isLock: true,
      disabled: true,
      accountLogin: true, // 账号密码登录
      isRegister: false,
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
      } else {
        console.log('________values', values);

        const url = 'http://localhost:3000/api';
        const request = new Request(`${url}/login`, {
          method: 'POST',
          body: JSON.stringify(values),   //请求体
          mode: 'cors',
          redirect: 'follow',
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          })
        });
        fetch(request)
          .then((res) => res.json())
          .catch((err) => console.log('_______err', err))
          .then(res => {
            if (res.code !== 200) {
              console.log('_______res', res);
            } else {
              window.location.href = 'http://localhost:3000/home/';
            }
          });
      }
    });
  }
  unlock() {
    const { isLock } = this.state;
    this.setState({ isLock: !isLock });
  }
  checked = () => {
    const isCheck = this.props.form.getFieldValue('remember');
    this.setState({ disabled: isCheck });
  }
  onBlur = (e) => {
    // this.props.form.validateFields();
  }
  sendValidateNum = () => {
    console.log('___________发送验证码');
  }
  // 切换登录方式
  loginWay = () => {
    const { accountLogin } = this.state;
    this.setState({ accountLogin: !accountLogin });
  }
  // 更换手机号归属地
  handleChange = () => {
    console.log('___________更换手机号归属地');
  }
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  }
  register = () => {
    const { isRegister } = this.state;
    this.setState({ isRegister: !isRegister });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLock, disabled, accountLogin, isRegister } = this.state;
    return (
      <div className="login-form-box">
        <Form onSubmit={this.handleSubmit} className="login-form">
          {
            accountLogin ?
              <div>
                <Form.Item>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入您的手机号或者邮箱!' }],
                  })(
                    <Input onBlur={this.onBlur} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号或邮箱" />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    isLock ?
                      <Input
                        onBlur={this.onBlur}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={<Icon type={`${isLock ? 'lock' : 'unlock'}`} style={{ cursor: 'pointer' }} onClick={() => this.unlock()} />}
                        type="password"
                        placeholder="密码" />
                      :
                      <Input
                        onBlur={this.onBlur}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={<Icon type={`${isLock ? 'lock' : 'unlock'}`} style={{ cursor: 'pointer' }} onClick={() => this.unlock()} />}
                        type="text"
                        placeholder="密码" />
                  )}
                </Form.Item>
              </div>
              :
              <div>
                <Form.Item>
                  {getFieldDecorator('photoNumber', {
                    initialValue: { number: 0, currency: 'rmb' },
                    rules: [{ validator: this.checkPrice }],
                  })(<PhotoNumber />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('validateNum', {
                    rules: [{ required: true, message: '请输入6位数字验证码!' }],
                  })(
                    <Input
                      onBlur={this.onBlur}
                      suffix={<span style={{ cursor: 'pointer' }} onClick={this.sendValidateNum}>获取验证码</span>}
                      type="number"
                      placeholder="请输入6位数字验证码" />
                  )}
                </Form.Item>
              </div>
          }
          {
            accountLogin ?
              <div className="flex-box" >
                <span onClick={this.loginWay}>手机验证码登录</span>
                <a href="#/header">忘记密码</a>
              </div>
              :
              <div className="flex-box" >
                <span onClick={this.loginWay}>密码登录</span>
              </div>
          }
          <Button type="primary" htmlType="submit" disabled={isRegister && disabled ? true : false} className="login-form-button">
            {isRegister ? '注册' : '登录'}
          </Button>
          {
            isRegister &&
            <Form.Item>
              {getFieldDecorator('remember', {
                // valuePropName: 'checked',
                // initialValue: true,
              })(
                <Checkbox onClick={this.checked}>注册协议</Checkbox>
              )}
            </Form.Item>
          }
          {
            isRegister ?
              <span style={{ cursor: 'pointer' }} onClick={this.register}>已有账号，登录</span>
              :
              <span style={{ cursor: 'pointer' }} onClick={this.register}>没有账号，注册</span>
          }
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create()(LoginForm);
export default WrappedNormalLoginForm;