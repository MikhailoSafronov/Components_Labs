function asyncMap(array, asyncFn, doneCallback) {
  let results = new Array(array.length);
  let pending = array.length;
  let hasError = false;

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
        doneCallback(null, results);
      }
    });
  });
}
// Тест:
asyncMap([1,2,3], (num, cb) => {
  setTimeout(() => cb(null, num*2), 500);
}, (err, res) => {
  console.log( err, res); // Очікуємо: null [2,4,6]
});

