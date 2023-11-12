// ShoppingListPage.jsx
import { Badge, Box, CircularProgress, Container, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';

import { fetchCategories, fetchProducts } from '../api/api';
import useTotalProductsQuantity from '../hooks/useTotalProductsQuantity';
import { ICategory, IProduct } from '../types/types';
import AddItem from './AddItem/AddItem';
import Category from './Category/Category';

const LoadingOrError = ({ isLoading, error }) => {
  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <Typography color="error">Error loading data</Typography>;
  }
  return null;
};

const ShoppingListPage = () => {
  const {
    data: products,
    error: productsError,
    isLoading: isProductsLoading,
  } = useQuery<IProduct[]>('products', fetchProducts, {
    staleTime: Infinity,
  });

  const {
    data: categories,
    error: categoriesError,
    isLoading: isCategoriesLoading,
  } = useQuery<ICategory[]>('categories', fetchCategories, {
    staleTime: Infinity,
  });

  const totalProductsQuantity = useTotalProductsQuantity(products || []);

  return (
    <Container>
      <AddItem categories={categories || []} />
      <Box my={4} display="flex" justifyContent="center">
        <Typography variant="h6">
          סך כמות המוצרים: <Badge badgeContent={totalProductsQuantity} color="primary" />
        </Typography>
      </Box>
      <LoadingOrError
        isLoading={isProductsLoading || isCategoriesLoading}
        error={productsError || categoriesError}
      />
      {categories?.map((category) => (
        <Category key={category._id} category={category} products={products} />
      ))}
    </Container>
  );
};

export default ShoppingListPage;
