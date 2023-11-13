import { Badge } from '@mui/material';
import { useQuery } from 'react-query';

import { fetchProducts } from '../../../../api/api';
import type { ICategory, IProduct } from '../../../../types/types';

const ShoppingItemsCount = ({ category }: { category?: ICategory }) => {
  const { data: productsCount } = useQuery({
    queryKey: 'products',
    queryFn: fetchProducts,
    select: (products) => {
      if (category) {
        products = products.filter(
          (product: IProduct) => product.categoryId === category?._id,
        );
      }
      return products.reduce((acc, product) => acc + product.quantity, 0);
    },
  });

  return <Badge badgeContent={productsCount || 0} color="primary" />;
};

export default ShoppingItemsCount;
