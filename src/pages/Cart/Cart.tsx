import React, { ReactElement } from 'react';
import { useNavigation } from 'react-router-dom';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';

const CartPage = (): ReactElement => {
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <CirclePreloader pageClassname="catalog" />;
  }

  return (
    <div className="cart-page">
      <h1 style={{ textAlign: 'center' }}>Страница корзины (в разработке)</h1>;
    </div>
  );
};

export default CartPage;
