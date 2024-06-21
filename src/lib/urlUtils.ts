export const getDecodedParam = (param: string | null): string | null => {
  if (param) {
    try {
      return atob(param);
    } catch (e) {
      console.error("Failed to decode parameter:", e);
      return null;
    }
  }
  return null;
};
