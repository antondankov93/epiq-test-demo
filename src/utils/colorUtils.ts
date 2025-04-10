export const getFieldColor = (fieldId: string): string => {
  // Simple hash function to generate a consistent color for each field
  const hash = fieldId.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const h = Math.abs(hash) % 360;
  return `hsla(${h}, 70%, 80%, 0.5)`;
};
