// Category.jsx
import {
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import { ICategory, IProduct } from '../types/types';

const Category = ({ category, products }) => {
  const productsInCategory =
    products?.filter((product) => product.categoryId === category._id) || [];
  const productsInCategoryQuantity = productsInCategory.reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  return (
    <Paper elevation={3} sx={{ mb: 4, p: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom align="center" color="primary">
        {category.name}
        <Badge badgeContent={productsInCategoryQuantity} color="secondary" />
      </Typography>
      <Divider />
      <List>
        {productsInCategory.map((product) => (
          <ListItem key={product._id} divider>
            <ListItemText
              primary={`${product.name} - ${product.quantity}`}
              primaryTypographyProps={{ align: 'center', color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Category;
