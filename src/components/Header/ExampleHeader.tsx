import React from 'react';
import './ExampleHeader.scss';
import img from '@images/jpg/test.jpg';

const ExampleHeader = (): React.ReactElement => {
  return (
    <>
      <div className="test-back">
        <h1 className="test">Hello, world</h1>
      </div>
      <img src={img} alt="test" />
    </>
  );
};

export default ExampleHeader;
