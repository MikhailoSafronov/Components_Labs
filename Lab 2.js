function promiseMap(array, asyncFn) {
    return Promise.all(array.map(asyncFn));
}

function sometimesFail(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num === 2) reject(new Error("Failed on 2"));
            else resolve(num*2);
        }, 300);
    });
}

promiseMap([1,2,3], sometimesFail)
    .then(res => console.log( res))
    .catch(err => console.error("Error:", err.message)); // "Failed on 2"
