import clsx from 'clsx';
import './Select.css';
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from "react";

export interface SelectApi {
  open: () => void;
  close: () => void;
}

export interface SelectProps {
  items: string[]
  value: string
  onChange?: (value: string) => void
}

const Select = memo(forwardRef<SelectApi, SelectProps>(function Select({ items, value, onChange }: SelectProps, ref): ReactNode {

  console.log('Rendering Select');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onBodyClick(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', onBodyClick);
    return () => {
      window.removeEventListener('click', onBodyClick);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    open: () => { console.log('Opening select'); setIsOpen(true); },
    close: () => { console.log('Closing select'); setIsOpen(false); },
  }), []);

  function handleItemClick(item: string) {
    onChange?.(item);
    setIsOpen(false);
  }

  return (
    <div className="select" ref={selectRef}>
      <div className="selected-item" onClick={() => setIsOpen(!isOpen)}>
        {value}
      </div>
      {isOpen && (
        <div className="menu">
          {items.map(item => (
            <div
              key={item}
              className={clsx("item", { selected: item === value })}
              onClick={(event) => { event.stopPropagation(); handleItemClick(item);}}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}), (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.items === nextProps.items;
});

export default Select;