import React from 'react';
import './App.scss';
import img from '../../assets/test.jpg';

const App = (): React.ReactElement => {
  return (
    <>
      <div className="test-back">
        <h1 className="test">Hello, world</h1>
      </div>
      <img src={img} alt="test" />
    </>
  );
};

export default App;
