import React from 'react';
// import './index.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   Switch,
// } from 'react-router-dom'
import ReactDOM from "react-dom";

const App = () => (
    <div
      className='ui text container'
    >
      <h2 className='ui dividing header red'>
        Which body of water?
      </h2>

    </div>
);

export default App;


ReactDOM.render(
    <App />,
    document.getElementById('root')
);
  
