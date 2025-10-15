const express = require('express');
const app = express();
const { Worker } = require('worker_threads');
const THREAD_COUNT = 4;

const port = 3000;


app.get('/non-blocking', (req, res) => {
    res.status(200).send('This is non-blocking operation!')
})

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker("./four-workers.js", { workerData: { thread_count: THREAD_COUNT } });

        worker.on("message", (data) => {
            resolve(data);
        });

        worker.on("error", (error) => {
            reject(error);
        });


    })
}
app.get('/blocking', async (req, res) => {
    const workerPromises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        workerPromises.push(createWorker());
    }

    const thread_result = await Promise.all(workerPromises);
    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3];

    res.status(200).send(`This is blocking operation! The result is: ${total}`);
})


app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})