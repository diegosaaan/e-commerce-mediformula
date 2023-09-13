import React, { Dispatch, ReactElement } from 'react';
import { Popconfirm, notification } from 'antd';
import './ProductsList.scss';
import Button from '@/components/Button/Button';
import ProductListItem from '../ProductListItem.tsx/ProductListItem';
import { ILineItem } from '@/types/apiInterfaces';
import { handleDeleteAllProducts } from '@/services/cart';
import useAuth from '@/utils/hooks/useAuth';

const ProductsList = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}): ReactElement => {
  const { userCart, setUserCart } = useAuth();

  const handleDeleteAllProductsInCart = async (): Promise<void> => {
    setIsLoading(true);
    const result = await handleDeleteAllProducts();
    if (result) {
      setUserCart(result);
      setIsLoading(false);
      notification.success({
        message: <p className="auth__notification auth__notification_type_success">Корзина очищена!</p>,
        description: <p className="auth__notification">Все товары успешно удалены из корзины</p>,
      });
    } else {
      setIsLoading(false);
    }
  };

  return (
    <section className={`cart__product-list-container ${isLoading ? 'cart__product-list-container_type_loading' : ''}`}>
      <header className="cart__product-list-header">
        <Popconfirm
          title="Вы уверены, что хотите удалить все товары из корзины?"
          onConfirm={handleDeleteAllProductsInCart}
          okText="Да"
          cancelText="Отмена"
        >
          <Button className="cart__product-list-header-clear-btn" type="button">
            Очистить корзину
          </Button>
        </Popconfirm>
      </header>
      <ul className="cart__product-list">
        {userCart &&
          userCart.lineItems.map((product: ILineItem) => (
            <ProductListItem productData={product} key={product.id} isLoading={isLoading} setIsLoading={setIsLoading} />
          ))}
      </ul>
    </section>
  );
};

export default ProductsList;
