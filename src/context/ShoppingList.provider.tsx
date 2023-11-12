import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const shoppingListClient = new QueryClient();

const ShoppingListProvider = (props: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={shoppingListClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default ShoppingListProvider;
