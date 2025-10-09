import type { ReactNode } from 'react';

type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

function List<T>({ items, renderItem }: Props<T>): ReactNode {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

export default List;