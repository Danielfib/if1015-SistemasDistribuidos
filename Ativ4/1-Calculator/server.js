const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader")
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculatorPackage = grpcObject.calculatorPackage;

const server = new grpc.Server();
server.bind("0.0.0.0:40000",
 grpc.ServerCredentials.createInsecure());

server.addService(calculatorPackage.Calculator.service,
    {
        "createExpression": createExpression
    });
server.start();

const expressions = []
function createExpression (call, callback) {
    const expressionItem = {
        "id": expressions.length + 1,
        "arg1": call.request.arg1,
        "op": call.request.op,
        "arg2": call.request.arg2,
        "answer": calculate(call.request.arg1, call.request.op, call.request.arg2)
    }
    expressions.push(expressionItem)
    console.log("respondendo: " + expressionItem.answer)
    callback(null, expressionItem);
}

function calculate(a, op, b){
    var result = 0;
    switch(op){
        case '/':
            result = a / b;
            break;
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
    }
    return result.toString();
}