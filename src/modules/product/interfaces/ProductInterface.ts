import { ICategory } from '../../category/interfaces/CategoryInterface';

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  description?: string;
}
