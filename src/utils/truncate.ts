const truncate = (text: string, size: number) => {
  return text.length > size ? `${text.slice(0, size - 1)}...` : text;
};

export default truncate;
