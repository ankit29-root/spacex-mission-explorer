// debounce.js - utility to delay function execution
export default function debounce(fn, wait = 300) {
  let timeout;

  function debounced(...args) {
    // clear any previous scheduled call
    clearTimeout(timeout);

    // schedule a new one
    timeout = setTimeout(() => {
      fn(...args);
    }, wait);
  }

  // allow manual cancel (extra safety)
  debounced.cancel = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
