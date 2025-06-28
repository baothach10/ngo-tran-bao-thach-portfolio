export const convertImageBufferToBlobUrl = (imageBuffer: ArrayBuffer, type: string) => {
  const blob = new Blob([imageBuffer], { type });
  return URL.createObjectURL(blob);
};

