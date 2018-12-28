import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import WrappedNormalLoginForm from './login';

if (process.env.NODE_ENV == 'production') {
  console.log('now mode is production');
} else {
  console.log('Looks like we are in development mode!');
}

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById('root'));