function promiseMap(array, asyncFn) {
    return Promise.all(array.map(asyncFn));
}

function doubleAsync(num) {
    return new Promise(resolve => setTimeout(() => resolve(num*2), 500));
}
