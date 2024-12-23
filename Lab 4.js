async function* largeDataSource() {
    for (let i = 0; i < 3; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        yield i;
    }
}

(async () => {
    for await (const item of largeDataSource()) {
        const transformed = item * 2;
        console.log("Step 4.2 transformed:", transformed);
    }
})();
