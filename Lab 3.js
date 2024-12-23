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

// Тест:
const signal = new FakeAbortSignal();
console.log("Before abort:", signal.aborted);
signal.abort();
console.log("After abort:", signal.aborted); // true
