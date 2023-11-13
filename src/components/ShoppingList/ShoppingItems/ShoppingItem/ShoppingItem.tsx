import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

import { IProduct } from '../../../../types/types';
import ShoppingItemDelete from './ShoppingItemDelete/ShoppingItemDelete';

const ShoppingItem = ({ product }: { product: IProduct }) => (
  <ListItem key={product._id} divider>
    <ListItemText
      primary={`${product.name} (${product.quantity})`}
      primaryTypographyProps={{ align: 'center', color: 'text.secondary' }}
      sx={{ whiteSpace: 'nowrap' }}
    />
    <ShoppingItemDelete id={product._id} />
  </ListItem>
);

export default ShoppingItem;
