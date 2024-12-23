function asyncMapWithDebounce(array, asyncFn, doneCallback, debounceThreshold = 1000) {
  let results = new Array(array.length);
  let pending = array.length;
  let hasError = false;
  const startTime = Date.now();

  if (pending === 0) {
    return doneCallback(null, []);
  }

  array.forEach((item, index) => {
    asyncFn(item, (err, transformed) => {
      if (hasError) return;
      if (err) {
        hasError = true;
        return doneCallback(err);
      }
      results[index] = transformed;
      pending--;
      if (pending === 0 && !hasError) {
        const elapsed = Date.now() - startTime;
        if (elapsed < debounceThreshold) {
          const waitTime = debounceThreshold - elapsed;
          setTimeout(() => doneCallback(null, results), waitTime);
        } else {
          doneCallback(null, results);
        }
      }
    });
  });
}

// Тест:
asyncMapWithDebounce([1,2,3], (num, cb) => {
  setTimeout(() => cb(null, num*2), 100);
}, (err, res) => {
  console.log("debounce test:", err, res); // ~через 1 сек null [2,4,6]
}, 1000);
