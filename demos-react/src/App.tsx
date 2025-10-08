import './App.css'
import { useRef, useState } from 'react'
import Select, { type SelectApi } from './Select'

function App() {
  const [value, setValue] = useState('Item 2')
  const select2Ref = useRef<SelectApi>(null);

  function handleChangeSelect1(val: string) {
    setValue(val);
    select2Ref.current?.open();
  }

  return (
    <>
      <Select items={['Item 1', 'Item 2', 'Item 3']} value={value} onChange={handleChangeSelect1} />
      <Select items={['Item 1', 'Item 2', 'Item 3']} value={value} onChange={setValue} ref={select2Ref} />
      <p>Selected value: {value}</p>
    </>
  )
}

export default App
