import { join } from 'path';
import { ServerCredentials } from '@grpc/grpc-js';

const rootCert = fs.readFileSync(join(__dirname, '../certs/rootCA.crt'));
const serverCert = fs.readFileSync(join(__dirname, '../certs/server.crt'));
const serverKey = fs.readFileSync(join(__dirname, '../certs/server.key'));

const tlsCreds = ServerCredentials.createSsl(
  rootCert,
  [{
    cert_chain: serverCert,
    private_key: serverKey,
  }],
  true, // request client certificate (optional)
);

// In your NestFactory.createMicroservice:
app.connectMicroservice({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: 'your.package',
    protoPath: join(__dirname, '../proto/your.proto'),
    credentials: tlsCreds,
  },
});
