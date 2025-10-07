# Certificate generation examples


## Server certification


```bash

openssl genrsa -out rootCA.key 4096

openssl req -x509 -new -nodes \
  -key rootCA.key \
  -sha256 \
  -days 10950 \
  -out rootCA.crt \
  -subj "/C=RU/ST=Moscow/L=Moscow/O=Intergalactic Corporation/OU=CA/CN=Intergalactic Corporation Root CA"

openssl genrsa -out server.key 2048

openssl req -new \
  -key server.key \
  -out server.csr \
  -subj "/C=RU/ST=Moscow/L=Moscow/O=Intergalactic Corporation/OU=Server/CN=server"

openssl x509 -req \
  -in server.csr \
  -CA rootCA.crt \
  -CAkey rootCA.key \
  -CAcreateserial \
  -out server.crt \
  -days 3650 \
  -sha256 \
  -extfile server_ext.cnf \
  -extensions v3_req

openssl x509 -in rootCA.crt -out rootCA.pem -outform PEM

openssl x509 -in server.crt -out server.pem -outform PEM


```



## Client mTLS


```bash

openssl genrsa -out client.key 2048

openssl req -new -key client.key -out client.csr \
  -subj "/C=RU/ST=Moscow/L=Moscow/O=Intergalactic Corporation/OU=Client/CN=client"

openssl x509 -req \
  -in client.csr \
  -CA rootCA.crt \
  -CAkey rootCA.key \
  -CAcreateserial \
  -out client.crt \
  -days 3650 \
  -sha256

openssl x509 -in client.crt -out client.pem -outform PEM


```

