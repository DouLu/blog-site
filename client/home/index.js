import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { HashRouter as Router, Route } from 'react-router-dom'
import WrappedNormalLoginForm from '../login/login';
import Home from '../components/Home';

if (process.env.NODE_ENV == 'production') {
  console.log('now mode is production');
} else {
  console.log('Looks like we are in development mode!');
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/test" component={WrappedNormalLoginForm} />
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));