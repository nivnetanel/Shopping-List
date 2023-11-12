import { Divider, Grid, List, Paper, Typography } from '@mui/material';
import { useQuery } from 'react-query';

import { fetchProducts } from '../../../api/api';
import { ICategory, IProduct } from '../../../types/types';
import ProductItem from './ShoppingItem/ShoppingItem';
import ShoppingItemsCount from './ShoppingItemsCount/ShoppingItemsCount';

const ShoppingItems = ({ category }: { category: ICategory }) => {
  const { data: products } = useQuery<IProduct[]>({
    queryKey: 'products',
    queryFn: fetchProducts,
    initialData: [],
    select: (products) =>
      products?.filter((product) => product.categoryId === category._id) || [],
  });

  return (
    <Paper
      elevation={3}
      sx={{
        flex: '0.3 1 auto',
        py: 2,
        px: 4,
        width: 'fit-content',
        bgcolor: 'background.paper',
        minWidth: '220px',
        '&:has(ul:empty)': {
          display: 'none',
        },
      }}
    >
      <Grid item xs={12} sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom align="center" color="primary">
          {category.name}
        </Typography>
        <ShoppingItemsCount category={category} />
      </Grid>
      <Divider />
      <List>
        {(products || []).map((product) => {
          return <ProductItem key={`product_${product._id}`} product={product} />;
        })}
      </List>
    </Paper>
  );
};

export default ShoppingItems;
