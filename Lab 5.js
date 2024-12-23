const EventEmitter = require('events');

class DataEmitter extends EventEmitter {
    startEmitting() {
        let count = 0;
        const intervalId = setInterval(() => {
            this.emit('data', count++);
            if (count > 5) {
                this.emit('end');
                clearInterval(intervalId);
            }
        }, 300);
    }
}

const emitter = new DataEmitter();

emitter.on('data', d => {
    if (d % 2 === 0) {
        console.log("Even data:", d);
    }
});
emitter.on('end', () => console.log("No more data."));
emitter.startEmitting();
