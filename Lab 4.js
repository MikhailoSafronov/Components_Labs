async function* largeDataSource() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

async function processAndStore() {
    for await (const item of largeDataSource()) {
        console.log("Storing item:", item);
    }
    console.log("All processed and stored.");
}

processAndStore();
