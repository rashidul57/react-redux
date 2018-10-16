import React from 'react';
import ReactDOM from "react-dom";

const App = () => (
    <div className='ui text container'>
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

