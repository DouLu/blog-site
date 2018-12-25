import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV == 'production') {
  console.log('now mode is production');
} else {
  console.log('Looks like we are in development mode!');
}
const App = () => <div>
  <h1>hello react wenpack</h1>
  <button onClick={() => { console.error('error') }}>error</button>
</div>;
ReactDOM.render(<App />, document.getElementById('root'));