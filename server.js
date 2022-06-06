const PROTO_PATH = 'myproto.proto';
const PORT = '50051';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
});
const myProto = grpc.loadPackageDefinition(packageDefinition).myproto;

function sayHello(call, callback) {
  console.log('Requested: sayHello', call.request)
  callback(null, {message: 'Hello ' + call.request.name});
  // callback(null, {code: grpc.status.INTERNAL, message: 'invalid input'});
}
// add another methods
// ......

function main() {
  const server = new grpc.Server();
  server.addService(myProto.Greeter.service, {
    sayHello: sayHello
    // add others
    // ......
  });

  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
  console.log('Server Started. Port :', PORT)
}

main();
