const cluster = require('cluster'); //to create multiple instances for load balancing 
const os = require('os');
const dirname = require('path');
const fileURLtoPath = require('url');
 //use worker threads if you want to use single node js instance or process
const __dirname = dirname(fileURLtoPath(import.meta.url)); //to connect or execute index.js
//import can be used by including type module in package json file
const cpucount = os.cpus().length; //no of cpus

console.log(`The total number of CPUs is ${cpucount}`);
console.log(`Primary id=${process.pid}`); //this is different from index.js //multiple node js instance process ids
cluster.setupPrimary({
    exec: __dirname + "/index.js", //exec the copy index.js
});

for (let i = 0; i < cpucount; i++) {
    cluster.fork(); //start/initialize the available CPUs(creating multiple node js instances for load balancing)
}

cluster.on("exit",(worker,code,signal)=>{
    console.log(`Worker ${worker.process.pid} has been killed`);
    console.log("Starting another worker");
    cluster.fork();
})

//npm install loadtest & pm2 for process ids
//cmnd to chk load is --> npx loadtest -n 1200 -c 400 -k http://localhost:3000/heavy
//-n no of requests, -c is concurrent requests -k and then specify the url for which load test has to be done