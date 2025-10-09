import type { ReactNode } from 'react';

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

function List<T>({ items, renderItem }: Props<T>): ReactNode {
  return items.map((item, index) => renderItem(item, index));
}

export default List;