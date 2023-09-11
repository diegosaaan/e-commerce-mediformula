import './Cart.scss';
import React, { ReactElement, useEffect } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CirclePreloader from '@/components/Preloaders/CirclePreloader/CirclePreloader';
import EmptyCart from './components/EmptyCart/EmptyCart';
import ProductsList from './components/ProductsList/ProductsList';
import InfoCard from './components/InfoCard/InfoCard';
import { ICart } from '@/types/apiInterfaces';
import useAuth from '@/utils/hooks/useAuth';
import { getActiveCart } from '@/services/cart';

export const cartLoader = async (): Promise<ICart | null> => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // const url = `${ApiEndpoints.URL_CART}`;

  // try {
  //   const cartData = await new Promise((resolve) => {
  //     setTimeout(async () => {
  //       const data = await getCart(url);
  //       resolve(data);
  //     }, 500);
  //   });

  //   console.log(cartData);

  //   return {
  //     cartData,
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return null;
  // }

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
  const { setUserCart } = useAuth();

  useEffect(() => {
    setUserCart(initialCartData);
  }, []);

  if (navigation.state === 'loading') {
    return <CirclePreloader pageClassname="catalog" />;
  }

  return (
    <div className="cart-page _container">
      {!initialCartData || !initialCartData.lineItems.length ? (
        <EmptyCart />
      ) : (
        <>
          <h2 className="cart__heading">Корзина</h2>
          <div className="cart__content-container">
            <ProductsList />
            <InfoCard />
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
