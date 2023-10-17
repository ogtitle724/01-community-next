export function dataURLtoBlob(dataURL) {
  const base64 = dataURL.split(",")[1];
  const binary = atob(base64);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/png" }); // Assuming the data URL is for a PNG image
}
