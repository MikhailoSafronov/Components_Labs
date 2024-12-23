async function promiseMapWithLimit(array, asyncFn, limit) {
    let index = 0; // Поточний індекс обробки
    let active = 0; // Поточна кількість активних завдань
    const results = new Array(array.length); // Масив для збереження результатів

    return new Promise((resolve, reject) => {
        async function runNext() {
            if (index >= array.length && active === 0) {
                // Завершити, якщо оброблені всі елементи
                return resolve(results);
            }

            // Запустити нові завдання, якщо є доступний "слот"
            while (index < array.length && active < limit) {
                const currentIndex = index++; // Отримати поточний індекс
                active++; // Збільшити лічильник активних завдань

                (async () => {
                    try {
                        results[currentIndex] = await asyncFn(array[currentIndex]); // Виконати завдання
                    } catch (error) {
                        reject(error); // Помилка завершує проміс
                        return;
                    } finally {
                        active--; // Завдання завершено
                        runNext(); // Запустити наступне
                    }
                })();
            }
        }

        runNext(); // Розпочати виконання
    });
}

// Приклад використання
async function doubleAsync(num) {
    return new Promise(resolve => setTimeout(() => resolve(num * 2), 500));
}

promiseMapWithLimit([1, 2, 3, 4, 5], doubleAsync, 2)
    .then(res => console.log("(async/await):", res)) // [2, 4, 6, 8, 10]
    .catch(console.error);
