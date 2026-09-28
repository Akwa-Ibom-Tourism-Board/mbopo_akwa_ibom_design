const MAX_DIMENSION = 1000;
const JPEG_QUALITY = 0.82;

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not read image file"));
    image.src = dataUrl;
  });
}

// Draft/submission photos are persisted as data URLs (the mock backend is
// just localStorage, so there's nowhere else to put a File) — downscaling
// images before encoding keeps three photos per application well within a
// browser's localStorage quota. PDFs (allowed for the certificate of
// origin) can't be rasterized this way, so those pass through unchanged.
export async function toPersistableDataUrl(file: File): Promise<string> {
  const raw = await readFileAsDataUrl(file);
  if (!file.type.startsWith("image/")) return raw;

  const image = await loadImage(raw);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(image.width, image.height),
  );
  if (scale === 1) return raw;

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return raw;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}
