import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import {
  Badge,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query'; // Import hooks from React Query
import { toast } from 'react-toastify';

import { deleteProduct } from '../../api/api';

const Category = ({ category, products }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('המוצר נמחק בהצלחה!');
    },
    onError: (error) => {
      toast.error(`יש בעיה במחיקת המוצר: ${error.message}`);
    },
  });

  const handleDelete = (productId) => {
    deleteMutation.mutate(productId);
  };

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
            <IconButton
              onClick={() => handleDelete(product._id)}
              edge="end"
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Category;
