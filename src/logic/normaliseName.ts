export const normaliseName = (name: string) => {
  const n = name.toLowerCase();
  return `${n[0].toUpperCase()}${n.slice(1)}`;
};
