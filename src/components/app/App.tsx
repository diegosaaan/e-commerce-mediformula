import React from 'react';
import './App.scss';
import img from '../../assets/test.jpg';

const App = (): React.ReactElement => {
  return (
    <>
      <h1 className="test">Привет, мир</h1>
      <img src={img} alt="тест" />
    </>
  );
};

export default App;
