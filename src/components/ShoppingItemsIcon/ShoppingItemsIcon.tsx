import AppleIcon from '@mui/icons-material/Apple';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PhishingIcon from '@mui/icons-material/Phishing';

import { ICategory } from '../../types/types';

type TIconMapKey = 'category' | 'product';

const iconsMap: { [key: `${TIconMapKey}_${number}`]: React.FC } = {
  category_1: AppleIcon,
  category_2: CleaningServicesIcon,
  category_3: PhishingIcon,
  category_4: KitchenIcon,
  category_5: BakeryDiningIcon,
};

export const ShoppingListIcon = ({
  key,
  category,
  ...props
}: {
  key: TIconMapKey;
  category: ICategory;
}) => {
  const Icon: React.FC = iconsMap[`${key}_${category._id}`] || BakeryDiningIcon;
  return <Icon {...props} />;
};
