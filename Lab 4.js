async function* largeDataSource() {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        yield i;
    }
}

(async () => {
    for await (const item of largeDataSource()) {
        if (item % 2 === 0) {
            console.log( item);
        }
    }
})();
