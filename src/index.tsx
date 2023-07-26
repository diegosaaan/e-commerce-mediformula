import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';

const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
