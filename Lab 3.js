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
    return Promise.all(array.map(asyncFn));
}

// Тест:
const s = new FakeAbortSignal();
s.abort(); // скасування одразу
promiseMapCancelable([1,2,3], num => Promise.resolve(num*2), { signal: s })
    .then(console.log)
    .catch(err => console.error( err.message));
