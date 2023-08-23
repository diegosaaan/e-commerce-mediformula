import { notification, message } from 'antd';
import React from 'react';
import exit from '@/assets/images/svg/auth-exit.svg';

notification.config({
  maxCount: 5,
  placement: 'bottomLeft',
  duration: 10,
  closeIcon: (
    <span className="ant-notification-close-x">
      <span role="img" aria-label="close" className="anticon anticon-close ant-notification-close-icon">
        <img className="auth__exit-btn" src={exit} alt="close" />
      </span>
    </span>
  ),
});

message.config({
  duration: 2,
  maxCount: 1,
});
