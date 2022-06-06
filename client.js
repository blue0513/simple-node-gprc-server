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

function main() {
  const target = `localhost:${PORT}`;
  const client = new myProto.Greeter(target, grpc.credentials.createInsecure());

  client.sayHello({name: 'john'}, function(err, response) {
    console.log('Response:', response.message);
  });
}

main();
