import { ICategory } from './CategoryInterface';

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  description?: string;
}
