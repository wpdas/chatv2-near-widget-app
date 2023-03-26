const isImageUrl = (url: string) =>
  /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(
    url.replace(",", "")
  );
export default isImageUrl;
