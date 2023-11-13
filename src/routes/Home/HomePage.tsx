import { Container, Typography } from '@mui/material';

import ShoppingList from '../../components/ShoppingList/ShoppingList';
import ShoppingListProvider from '../../context/ShoppingList.provider';

const HomePage = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography sx={{ textTransform: 'capitalize' }}>My grand shopping list</Typography>
      <ShoppingListProvider>
        <ShoppingList />
      </ShoppingListProvider>
    </Container>
  );
};

export default HomePage;
