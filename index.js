const express = require('express');
const app = express();
// const { Worker } = require('worker_threads');

const port = 3000;


// app.get('/non-blocking', (req, res) => {
//     res.status(200).send('This is non-blocking operation!')
// })

// app.get('/blocking', (req, res) => {
//     const worker = new Worker('./worker.js')

//     worker.on("message", (data) => {
//         res.status(200).send(`This is blocking operation! The result is: ${data}`);
//     });

//     worker.on("error", (error) => {
//         res.status(404).send(`An error occured ${error}`);
//     });

// })

app.get('/heavy', (req, res) => {
    let total = 0;
    for (let i = 0; i < 500000000; i++) {
        total++;
    }
    res.status(200).send(`The result of the CPU intensive task is ${process.pid} ${total}\n`)

})
app.listen(port, () => {
    console.log(`Server running at port  ${port}`);
    console.log(`Worker pid = ${process.pid}`);
})