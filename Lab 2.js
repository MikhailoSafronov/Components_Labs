function promiseMap(array, asyncFn) {
    return Promise.all(array.map(asyncFn));
}

function doubleAsync(num) {
    return new Promise(resolve => setTimeout(() => resolve(num*2), 200));
}

(async () => {
    try {
        const result = await promiseMap([1,2,3], doubleAsync);
        console.log("async/await:", result); // [2,4,6]
    } catch (err) {
        console.error(err);
    }
})();
