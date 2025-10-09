export function hello(name: string): string {
  if (name === '') {
    throw new Error('Name cannot be empty');
  }

  return `Hello, ${name}!`;
}