import './Cart.scss';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';
import EmptyCart from './components/EmptyCart/EmptyCart';
import ProductsList from './components/ProductsList/ProductsList';
import InfoCard from './components/InfoCard/InfoCard';
import { ICart, IUserTokenData } from '@/types/apiInterfaces';
import useAuth from '@/utils/hooks/useAuth';
import { createCart, getActiveCart } from '@/services/cart';
import SwiperSection from '@/components/SwiperSection/SwiperSection';
import SpinnerPreloader from '@/components/Preloaders/SpinnerPreloader/SpinnerPreloader';
import { createAnonymousToken, saveUserToken } from '@/services/tokenHelpers';

export const cartLoader = async (): Promise<ICart | null> => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const isUserToken = localStorage.getItem('1SortUserToken');
  const isAnonymousToken = localStorage.getItem('1SortAnonymousToken');

  let cartActive = null;

  try {
    if (isUserToken) {
      cartActive = await getActiveCart(true);
    } else if (isAnonymousToken) {
      cartActive = await getActiveCart(false);
    }
  } catch (error) {
    if (isUserToken) {
      cartActive = await createCart(true);
    } else if (isAnonymousToken) {
      cartActive = await createCart(false);
    }

    const anonymousTokenData = await createAnonymousToken();
    if (anonymousTokenData !== null && typeof anonymousTokenData === 'object') {
      saveUserToken(anonymousTokenData as IUserTokenData, '1SortAnonymousToken');
      cartActive = await createCart(false);
    }
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
    <div className="cart-page">
      <div className="_container cart__section-container">
        {!userCart || !userCart.lineItems.length ? (
          <>
            <h2 className="cart__heading">Корзина пуста</h2>
            <EmptyCart />
          </>
        ) : (
          <>
            <h2 className="cart__heading">Корзина</h2>
            <div className="cart__content-container">
              <ProductsList isLoading={isLoading} setIsLoading={setIsLoading} />
              <InfoCard isLoading={isLoading} setIsLoading={setIsLoading} />
            </div>
          </>
        )}
      </div>
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
