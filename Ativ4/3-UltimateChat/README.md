# Using gRPC to build a chat service

## How?
```bash
# install gRPC, if you don't have it already
npm install grpc @grpc/proto-loader

# run the server
node server.js

# for each desired client:
## run the client
node client.js
## choose any name (different from previous chosen names)
Daniel
## type any message in any client terminal and the message will be broadcasted to all other clients
```

To end the connection, simply type "end" on the client you wish to disconnect