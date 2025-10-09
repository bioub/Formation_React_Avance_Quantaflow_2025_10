function fakeFetch(url: string): Promise<{ data: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Response from ${url}` });
    }, 1000);
  });
}

export { fakeFetch };