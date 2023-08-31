import React, { ReactElement } from 'react';

const ProfilePreloader = (): ReactElement => {
  return (
    <>
      <div className="preloader preloader_type_profile">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
    </>
  );
};

export default ProfilePreloader;
