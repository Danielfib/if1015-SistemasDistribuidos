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
        "createExpression": createExpression,
        "readExpressions" : readExpressions,
        "readExpressionsStream": readExpressionsStream
    });
server.start();

const expressions = []
function createExpression (call, callback) {
    const expressionItem = {
        "id": expressions.length + 1,
        "arg1": call.request.arg1,
        "op": call.request.op,
        "arg2": call.request.arg2
    }
    expressions.push(expressionItem)
    callback(null, expressionItem);
}

function readExpressionsStream(call, callback) {
    
    expressions.forEach(t => call.write(t));
    call.end();
}

function readExpressions(call, callback) {
    callback(null, {"items": expressions})   
}