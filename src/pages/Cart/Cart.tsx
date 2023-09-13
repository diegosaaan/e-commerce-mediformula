import './Cart.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';
import EmptyCart from './components/EmptyCart/EmptyCart';
import ProductsList from './components/ProductsList/ProductsList';
import InfoCard from './components/InfoCard/InfoCard';
import { ICart } from '@/types/apiInterfaces';
import useAuth from '@/utils/hooks/useAuth';
import { getActiveCart } from '@/services/cart';
import SwiperSection from '@/components/SwiperSection/SwiperSection';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';

export const cartLoader = async (): Promise<ICart | null> => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const userToken = localStorage.getItem('1SortUserToken');
  const anonymousToken = localStorage.getItem('1SortAnonymousToken');

  let cartActive = null;
  if (userToken) {
    cartActive = await getActiveCart(true);
  } else if (anonymousToken) {
    cartActive = await getActiveCart(false);
  }

  return cartActive;
};

const CartPage = (): ReactElement => {
  const navigation = useNavigation();
  const initialCartData = useLoaderData() as ICart;
  const { userCart, setUserCart } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserCart(initialCartData);
  }, []);

  if (navigation.state === 'loading') {
    return <CirclePreloader pageClassname="catalog" />;
  }

  return (
    <div className="cart-page _container">
      {!userCart || !userCart.lineItems.length ? (
        <EmptyCart />
      ) : (
        <>
          <h2 className="cart__heading">Корзина</h2>
          <div className="cart__content-container">
            <ProductsList isLoading={isLoading} setIsLoading={setIsLoading} />
            <InfoCard isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
        </>
      )}
      <SwiperSection
        heading="Рекомендуем"
        counter={11}
        sectionClassName="cart__swiper"
        setIsDataFetching={setIsLoading}
      />
      <SpinnerPreloader pageClassname="cart" isDataFetching={isLoading} />
    </div>
  );
};

export default CartPage;
