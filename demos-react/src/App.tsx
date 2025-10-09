import './App.css'
import { useEffect, useRef, useState } from 'react'
import Select, { type SelectApi } from './Select'
import TodoList from './TodoList';

const items = ['Item 1', 'Item 2', 'Item 3'];

function App() {
  console.log('Rendering App');
  const [value, setValue] = useState('Item 2')
  const select2Ref = useRef<SelectApi>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []); 

  function handleChangeSelect1(val: string) {
    setValue(val);
    select2Ref.current?.open();
  }

  return (
    <>
      <Select items={items} value={value} onChange={handleChangeSelect1} />
      <Select items={items} value={value} onChange={setValue} ref={select2Ref} />
      <p>Selected value: {value}</p>
      <TodoList />
      <p>Il est {now.toLocaleTimeString()}</p>
    </>
  )
}

export default App
