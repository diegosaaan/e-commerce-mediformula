import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import ExampleHeader from './components/Header/ExampleHeader';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <ExampleHeader />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
