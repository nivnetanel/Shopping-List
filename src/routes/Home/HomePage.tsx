import { Container, Typography } from '@mui/material';

import ShoppingList from '../../components/ShoppingList/ShoppingList';
import ShoppingListProvider from '../../context/ShoppingList.provider';

const HomePage = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Typography
        sx={{
          fontSize: '40px',
          color: '#080808',
          transition: 'all 0.4s ease 0s',
          webkitTransition: 'all 0.4s ease 0s',
          fontWeight: '300',
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        My grand shopping list
      </Typography>
      <ShoppingListProvider>
        <ShoppingList />
      </ShoppingListProvider>
    </Container>
  );
};

export default HomePage;
