type Options<T> = {
  queryFn: () => Promise<T>;
};

const executeQuery = async <T>({ queryFn }: Options<T>) => {
  return await queryFn();
};

export { executeQuery };
