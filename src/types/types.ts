export interface IProduct {
  _id: number;
  name: string;
  quantity: number;
  categoryId: number;
}

export interface ICategory {
  _id: number;
  name: string;
  items: IProduct[];
}
