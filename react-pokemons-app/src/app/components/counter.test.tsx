// import { expect, test } from 'vitest';
// import ReactDOM from 'react-dom/client';
// import { UncontrolledCounter } from './counter';
// import { act } from 'react-dom/test-utils';

// test('UncontrolledCounter renders', () => {
//   const container = document.createElement('div');
//   document.body.appendChild(container);

//   const root = ReactDOM.createRoot(
//     container
//   );

//   act(() => {
//    root.render(<UncontrolledCounter />);
//   });

//   const button = container.querySelector('button');
//   console.log(document.body.innerHTML);

//   expect(button?.textContent).toBe('0');
// });
import { expect, test, vi } from 'vitest';
import { ControlledCounter, UncontrolledCounter } from './counter';
import { render, screen, fireEvent } from '@testing-library/react';

test('UncontrolledCounter renders with testing library', () => {
  render(<UncontrolledCounter />);
  screen.debug();
});

test('UncontrolledCounter renders 0 initially', () => {
  render(<UncontrolledCounter />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('0');
});


test('UncontrolledCounter increments on click', () => {
  render(<UncontrolledCounter />);
  const button = screen.getByRole('button');
  
  fireEvent.click(button);
  expect(button).toHaveTextContent('1');
});

test('ControlledCounter renders with given count', () => {
  render(<ControlledCounter count={10} />);
  
  const el = screen.queryByText('10');
  expect(el).toBeInTheDocument();
});

test('ControlledCounter calls onIncrement when clicked', () => {
  const onIncrement = vi.fn();
  render(<ControlledCounter count={10} onIncrement={onIncrement} />);
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  expect(onIncrement).toHaveBeenCalled();
});