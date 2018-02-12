const dgram = require('dgram');
const buf1 = Buffer.alloc(64);

buf1.writeUInt8(0x04,0);
buf1.writeUInt8(0x01,1);
buf1.writeUInt8(0xAA,2);
buf1.writeUInt8(0x01,3);
buf1.writeUInt8(0xFE,4);

const client = dgram.createSocket('udp4');

client.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

client.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

client.on('listening', () => {
  const address = client.address();
  console.log(`server listening ${address.address}:${address.port}`);
});


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

setInterval(() => {
  client.send(buf1, 0, 5, 2964, "192.168.86.20", (err) => {
    buf1.writeUInt8(0x04,0);
    buf1.writeUInt8(getRandomInt(11),1);
    buf1.writeUInt8(getRandomInt(255),2);
    buf1.writeUInt8(getRandomInt(255),3);
    buf1.writeUInt8(getRandomInt(255),4);
  });
}, 32);


client.bind(2964);
