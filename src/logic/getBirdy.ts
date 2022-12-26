export const getBirdy = (): string => {
  const rand = Math.ceil(Math.random() * 6);
  return `/bird${rand}.webp`;
};
