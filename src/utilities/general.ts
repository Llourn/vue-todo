export const generateTodoId = () => {
  // Just something quick to generate 'unique' ids for the todos.
  const max = 100000000;
  return Math.floor(Math.random() * max);
}