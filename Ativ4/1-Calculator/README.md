# Using gRPC to build a calculator service

## How?
```bash
# install gRPC, if you don't have it already
npm install grpc @grpc/proto-loader

# run the server
node server.js

# run the client with parameters:
node client.js 1 + 1

#correct pattern for client parameters: arg1 op arg2
#where op should be one of: +, -, /, *
```

The server will message back the client with the answer.