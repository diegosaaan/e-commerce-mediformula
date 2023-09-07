import React, { ReactElement } from 'react';
import { useNavigation } from 'react-router-dom';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';

const AboutUsPage = (): ReactElement => {
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <CirclePreloader pageClassname="catalog" />;
  }

  return (
    <div className="cart-page">
      <h1 style={{ textAlign: 'center' }}>Страница о нас (в разработке)</h1>;
    </div>
  );
};

export default AboutUsPage;
