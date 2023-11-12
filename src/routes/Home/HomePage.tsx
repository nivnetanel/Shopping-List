import { Container, Grid, Typography } from '@mui/material';

import ShoppingList from '../../components/ShoppingList/ShoppingList';
import ShoppingListProvider from '../../context/ShoppingList.provider';

const HomePage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Typography sx={{ textTransform: 'capitalize' }}>
          My grand shopping list
        </Typography>
        <ShoppingListProvider>
          <ShoppingList />
        </ShoppingListProvider>
      </Grid>
    </Container>
  );
};

export default HomePage;
