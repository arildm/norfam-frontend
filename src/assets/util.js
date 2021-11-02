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
