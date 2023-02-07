export const EDITIONS = [
  undefined,
  "Första utgåvan (1876-1899)",
  "Andra utgåvan (1904-1926)",
];

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) =>
    new Promise((resolve) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(func.apply(this, args));
      }, timeout);
    });
}

export function download(filename, content, contentType) {
  if (!contentType) contentType = "text/plain;charset=utf-8";
  const a = document.createElement("a");
  const dataUrl = `data:${contentType},${encodeURIComponent(content)}`;
  a.setAttribute("href", dataUrl);
  a.setAttribute("download", filename);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/** Build an image URL for the GRIDH IIIF service. */
export function iiifUrl(file, options) {
  const region = options.region || "full";
  const size = options.size || "full";
  const rotation = options.rotation || 0;
  const quality = options.quality || "default";
  const format = options.format || "jpg";

  const query = `${region}/${size}/${rotation}/${quality}.${format}`;
  return `https://img.dh.gu.se/${file}/${query}`;
}
