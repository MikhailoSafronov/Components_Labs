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

const source = new DataEmitter();
const destination = new EventEmitter();

// Обробка: передаємо тільки парні дані далі, множимо на 10
source.on('data', d => {
    if (d % 2 === 0) {
        destination.emit('processedData', d * 10);
    }
});
source.on('end', () => destination.emit('done'));

destination.on('processedData', val => {
    console.log("Processed data received:", val);
});
destination.on('done', () => console.log("All done"));

source.startEmitting();
