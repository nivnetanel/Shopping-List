import { Stack } from '@mui/material';
import { useQuery } from 'react-query';

import { fetchCategories } from '../../api/api';
import type { ICategory } from '../../types/types';
import LoadingOrError from '../LoadingOrError/LoadingOrError';
import ShoppingItems from './ShoppingItems/ShoppingItems';
import AddItem from './ShoppingListAdd/ShoppingListAdd';
import ShoppingListHeader from './ShoppingListHeader/ShoppingListHeader';

const ShoppingListPage = () => {
  const { data: categories, isLoading } = useQuery<ICategory[]>({
    queryKey: 'categories',
    queryFn: fetchCategories,
  });

  if (!categories) {
    return (
      <LoadingOrError isLoading={isLoading} error={!categories ?? 'Error loading data'} />
    );
  }

  return (
    <Stack>
      <ShoppingListHeader />

      <AddItem categories={categories} />

      <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2.5}>
        {categories.map((category) => (
          <ShoppingItems key={category._id} category={category} />
        ))}
      </Stack>
    </Stack>
  );
};

export default ShoppingListPage;
