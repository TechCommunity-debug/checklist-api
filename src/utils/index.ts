export const genUsername = (): string => {
  const usernamerPrefix = 'user-';
  const randomChars = Math.random().toString(36).slice(2);

  return usernamerPrefix + randomChars;
};
