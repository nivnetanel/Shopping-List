import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import ShoppingItemsCount from '../ShoppingItems/ShoppingItemsCount/ShoppingItemsCount';

const ShoppingListHeader = () => {
  return (
    <Box my={2} gap={5} alignItems="center" display="flex" justifyContent="center">
      <Paper elevation={1} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" color="secondary" sx={{ marginRight: '10px' }}>
          סך כמות המוצרים:
        </Typography>
        <ShoppingItemsCount />
      </Paper>
    </Box>
  );
};

export default ShoppingListHeader;
