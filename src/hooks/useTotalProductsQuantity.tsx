import { useMemo } from 'react';

import { IProduct } from '../types/types';

const useTotalProductsQuantity = (products: IProduct[]): number => {
  const totalProductsQuantity = useMemo(() => {
    return products.reduce((acc, product) => acc + product.quantity, 0);
  }, [products]);

  return totalProductsQuantity;
};

export default useTotalProductsQuantity;
