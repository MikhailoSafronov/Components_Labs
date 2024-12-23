
class FakeAbortSignal {
    constructor() {
        this.aborted = false;
        this._listeners = [];
    }

    abort() {
        this.aborted = true;
        this._listeners.forEach(fn => fn());
    }

    addEventListener(evt, fn) {
        if (evt === 'abort') this._listeners.push(fn);
    }
}

function promiseMapCancelable(array, asyncFn, { signal } = {}) {
    if (signal && signal.aborted) {
        return Promise.reject(new Error("Aborted before start"));
    }

    const promises = array.map(item => {
        if (signal && signal.aborted) return Promise.reject(new Error("Aborted"));
        return asyncFn(item, signal);
    });

    return Promise.all(promises);
}

function delayedDouble(num, signal) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (signal && signal.aborted) return reject(new Error("Aborted"));
            resolve(num*2);
        }, 100);
    });
}

// Тест:
const s = new FakeAbortSignal();
setTimeout(() => s.abort(), 50);
promiseMapCancelable([1,2,3], delayedDouble, { signal: s })
    .then(console.log)
    .catch(err => console.error(err.message));
