import React from 'react';
import amrusPath from '@/assets/images/svg/brand-amrus.svg';
import arhMedPath from '@/assets/images/svg/brand-arhmed.svg';
import beurerPath from '@/assets/images/svg/brand-beurer.svg';
import bradexPath from '@/assets/images/svg/brand-bradex.svg';
import omronPath from '@/assets/images/svg/brand-omron.svg';
import andPath from '@/assets/images/svg/brand-and.svg';

interface IBrandIcons {
  [key: string]: React.ReactElement;
}

const BrandIcons: IBrandIcons = {
  Amrus: <img src={amrusPath} alt="AMRUS" />,
  ArhMed: <img src={arhMedPath} alt="ArhMed" />,
  Beurer: <img src={beurerPath} alt="BEURER" />,
  Bradex: <img src={bradexPath} alt="Bradex" />,
  OMRON: <img src={omronPath} alt="OMRON" />,
  AND: <img src={andPath} alt="AND" />,
};

export default BrandIcons;
