import { ICategory } from '../../modules/category/interfaces/CategoryInterface';

export interface IProduct {
  id: number;
  name: string;
  category: ICategory;
  description?: string;
}
