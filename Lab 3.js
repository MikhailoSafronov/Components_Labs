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

function cancellableDouble(num, signal) {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
            if (signal && signal.aborted) return reject(new Error("Aborted"));
            resolve(num*2);
        }, 500);

        if (signal) {
            signal.addEventListener('abort', () => {
                clearTimeout(timeoutId);
                reject(new Error("Aborted"));
            });
        }
    });
}

// Тест:
const s = new FakeAbortSignal();
const p = promiseMapCancelable([1,2,3], cancellableDouble, { signal: s });
setTimeout(() => s.abort(), 100);
p.then(console.log).catch(err => console.error("Canceled:", err.message));
