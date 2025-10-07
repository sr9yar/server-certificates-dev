const clientRoot = fs.readFileSync('certs/rootCA.crt');
const clientKey = fs.readFileSync('certs/client.key');
const clientCert = fs.readFileSync('certs/client.crt');

const clientCreds = grpc.credentials.createSsl(
  clientRoot,
  clientKey,
  clientCert,
);

const client = new YourService(
  'localhost:50051',
  clientCreds,
);
