import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';

import { addproduct } from '../../api/api';
import { ICategory } from '../../types/types';

interface AddItemProps {
  categories: ICategory[];
}

const AddItem: React.FC<AddItemProps> = ({ categories }) => {
  const [productName, setProductName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const queryClient = useQueryClient();

  const addMutation = useMutation(addproduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('מוצר התווסף לרשימה!');
      setDialogOpen(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    },
    onError: (error: Error) => {
      toast.error(`שגיאה בעת הוספת הפריט: ${error.message || 'Unknown error'}`);
    },
  });

  const handleAddProduct = () => {
    if (!productName || selectedCategory === undefined) {
      toast.error('נא למלא את כל השדות');
      return;
    }

    addMutation.mutate({ categoryId: selectedCategory, productName });
  };

  return (
    <Container maxWidth="sm">
      {showConfetti && <Confetti />}

      <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
        הוספת פריט{' '}
      </Button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>הוספת פריט לרשימה</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">קטגוריה</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              {categories.map((category: ICategory) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="מוצר"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            ביטול
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            הוסף
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Container>
  );
};

export default AddItem;
