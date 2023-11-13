import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { addproduct } from '../../../api/api';
import { ICategory } from '../../../types/types';

interface ShoppingListAddProps {
  categories: ICategory[];
}

const ShoppingListAdd: React.FC<ShoppingListAddProps> = ({ categories }) => {
  const [productName, setProductName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const queryClient = useQueryClient();

  const addMutation = useMutation(addproduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast.success('מוצר התווסף לרשימה!');
      console.log('toast success!!!!!!');
      setDialogOpen(false);
      setShowConfetti(true);
      // TODO: Reset the form values, or ask do you want to another?
      setTimeout(() => setShowConfetti(false), 4000);
    },
    onError: (error: Error) => {
      toast.error(`שגיאה בעת הוספת הפריט: ${error.message || 'Unknown error'}`);
    },
  });

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (addMutation.isLoading) {
      return;
    }
    if (!productName || selectedCategory === undefined) {
      toast.error('נא למלא את כל השדות');
      return;
    }
    if (categories.findIndex((category) => category._id === selectedCategory) === -1) {
      toast.error('עליך למלא קטגוריה מהרשימה');
      return;
    }

    addMutation.mutate({ categoryId: selectedCategory, name: productName });
  };

  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (
    <Container maxWidth="sm">
      {showConfetti && <Confetti />}
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          הוספת פריט
        </Button>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>הוספת פריט לרשימה</DialogTitle>
        <form onSubmit={handleAddProduct}>
          <DialogContent>
            <Autocomplete
              options={categoryOptions}
              onChange={(_e, newValue) => newValue && setSelectedCategory(newValue.value)}
              value={
                selectedCategory
                  ? categoryOptions.find(({ value }) => value === selectedCategory)
                  : null
              }
              isOptionEqualToValue={(value) => value.value === selectedCategory}
              PaperComponent={({ children }) => (
                <Paper
                  sx={{
                    '& .MuiAutocomplete-listbox': {
                      '& .MuiAutocomplete-option': {
                        paddingY: 1.5,
                      },
                      "& .MuiAutocomplete-option[aria-selected='true']": {
                        bgcolor: 'primary',
                        fontWeight: 600,
                        '&.Mui-focused': {
                          bgcolor: 'primary',
                        },
                      },
                    },
                    '& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused': {
                      bgcolor: '#fff0f0',
                    },
                  }}
                >
                  {children}
                </Paper>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="קטגוריה"
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
              )}
              noOptionsText="לא מצאנו מה שחיפשת... "
            />
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
            <Button type="submit" color="primary">
              הוסף
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default ShoppingListAdd;
