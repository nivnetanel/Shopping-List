import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import { IconButton } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { deleteProduct } from '../../../../../api/api';
import { IProduct } from '../../../../../types/types';

const ShoppingItemDelete = ({ id }: { id: IProduct['_id'] }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.setQueryData<IProduct[]>(
        'products',
        (products) => products?.filter((product) => product._id !== id) || [],
      );
      toast.success('המוצר נמחק בהצלחה!');
    },
    onError: (error: Error) => {
      toast.error(`יש בעיה במחיקת המוצר: ${error.message}`);
    },
  });

  return (
    <IconButton
      disabled={deleteMutation.isLoading}
      onClick={() => deleteMutation.mutate(id)}
      edge="end"
      aria-label="delete"
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default ShoppingItemDelete;
