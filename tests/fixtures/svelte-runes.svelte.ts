export function createCounter() {
  let count = 0;
  const increment = (): void => { count += 1; };
  return { get count() { return count; }, increment };
}
