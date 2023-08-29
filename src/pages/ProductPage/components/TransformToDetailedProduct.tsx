import { IPropsDetailedProduct, IPropsProduct } from '@/types/componentsInrefaces';

const TransformToDetailedProduct = (product: IPropsProduct): IPropsDetailedProduct => {
  return {
    images: product.masterVariant.images || 'default-image.png',
    name: product.name.ru,
    description: product.description.ru,
    price:
      product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0
        ? (product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0) / 100
        : (product.masterVariant.prices[0]?.value.centAmount ?? 0) / 100 || 0,
    priceBefore: (product.masterVariant.prices[0]?.value.centAmount ?? 0) / 100 || 0,
    bonus: 150,
    brand: product.masterVariant.attributes[0].value.ru,
  };
};

export default TransformToDetailedProduct;
