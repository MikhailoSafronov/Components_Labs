async function* largeDataSource() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

(async () => {
    for await (const val of largeDataSource()) {
        console.log( val);
    }
})();
