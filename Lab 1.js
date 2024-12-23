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

// Тест з помилкою:
asyncMap([1,2,3], (num, cb) => {
  setTimeout(() => {
    if (num === 2) cb(new Error("Test error"));
    else cb(null, num*2);
  }, 100);
}, (err, res) => {
  console.log( err, res);
  // Очікуємо: err = Error("Test error"), res = undefined
});
