import { Tag } from 'antd';

import { ICategory } from '../../category/interfaces/CategoryInterface';

interface CategoryColumProps {
  category?: ICategory;
}

const colors: string[] = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const CategoryColumn = ({ category }: CategoryColumProps) => {
  if (!category) return null;
  const currentColor = colors[category.id - 1] || colors[0];
  return <Tag color={currentColor}>{category.name}</Tag>;
};

export default CategoryColumn;
