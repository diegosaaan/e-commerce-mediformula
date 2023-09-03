import { IProductData } from '@/types/apiInterfaces';
import { IPropsCard } from '@/types/componentsInrefaces';

const TransformProductToCardProps = (product: IProductData): IPropsCard => {
  return {
    imagePath: product.masterVariant.images[0]?.url || 'default-image.png',
    rating: 4.8,
    text: product.name.ru,
    price:
      product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0
        ? (product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0) / 100
        : (product.masterVariant.prices[0]?.value.centAmount ?? 0) / 100 || 0,
    priceBefore: (product.masterVariant.prices[0]?.value.centAmount ?? 0) / 100 || 0,
    bonus: 150,
    discount:
      product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0
        ? Math.ceil(
            (1 -
              (product.masterVariant.prices[0]?.discounted?.value.centAmount ?? 0) /
                (product.masterVariant.prices[0]?.value.centAmount ?? 0)) *
              100
          )
        : 0,
    onClick: (): void => window.scrollTo({ top: 0, behavior: 'smooth' }),
  };
};

export default TransformProductToCardProps;
