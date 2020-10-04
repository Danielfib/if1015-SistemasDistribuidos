const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;

//const text = process.argv[2];
const arg1 = process.argv[2];
const op = process.argv[3];
const arg2 = process.argv[4];

const client = new calculatorPackage.Calculator("localhost:40000", 
grpc.credentials.createInsecure())

client.createExpression({
    "id": -1,
    "arg1": parseInt(arg1),
    "op": op,
    "arg2": parseInt(arg2),
}, (err, response) => {

    console.log("Recieved from server " + JSON.stringify(response))

})
/*
client.readTodos(null, (err, response) => {
    console.log("read the todos from server " + JSON.stringify(response))
    if (!response.items)
        response.items.forEach(a=>console.log(a.text));
})
*/

const call = client.readExpressionsStream();
call.on("data", item => {
    console.log("received item from server " + JSON.stringify(item))
})

call.on("end", e => console.log("server done!"))