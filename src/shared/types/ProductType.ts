import { ICategory } from './CategoryType';

export interface IProduct {
  id?: number;
  name: string;
  category: ICategory;
  description: string;
}
