import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import WrappedNormalLoginForm from './login';
import WrappedRegistrationForm from './register';
import { Button } from 'antd';

if (process.env.NODE_ENV == 'production') {
  console.log('now mode is production');
} else {
  console.log('Looks like we are in development mode!');
}

class UserForm extends React.Component {
  state = {
    isLogin: false
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div>
        {isLogin ? <WrappedNormalLoginForm /> : <WrappedRegistrationForm />}
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => { this.setState({ isLogin: !isLogin }) }}>{!isLogin ? '已有账号，登录' : '没有账号，注册'}</Button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<UserForm />, document.getElementById('root'));