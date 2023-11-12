import AppleIcon from '@mui/icons-material/Apple';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PhishingIcon from '@mui/icons-material/Phishing';
import React from 'react';

enum Category {
  FruitsAndVegetables = 'ירקות ופירות',
  CleaningProducts = 'מוצרי ניקיון',
  MeatAndFish = 'בשר ודגים',
  Cheese = 'גבינות',
  Bakery = 'מאפים',
}

const iconMap: { [key in Category]: JSX.Element } = {
  [Category.FruitsAndVegetables]: <AppleIcon />,
  [Category.CleaningProducts]: <CleaningServicesIcon />,
  [Category.MeatAndFish]: <PhishingIcon />,
  [Category.Cheese]: <KitchenIcon />,
  [Category.Bakery]: <BakeryDiningIcon />,
};

export const getCategoryIcon = (categoryName: Category) => {
  return iconMap[categoryName] || <BakeryDiningIcon />;
};
