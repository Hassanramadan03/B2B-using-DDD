import { Injectable } from '@nestjs/common';
import * as  DHT from 'hyperdht'; // Import the HyperDHT library

@Injectable()
export class DHTService {
  private dht =new  DHT(); // Initialize DHT as a function

  createServer() {
    const server = this.dht.createServer();
    server.listen().then(() => {
      console.log('DHT server is listening for connections.');
    });
    return server;
  }

  connect(peerKey: string) {
    const socket = this.dht.connect(peerKey);
    socket.on('connect', () => {
      console.log(`Connected to peer: ${peerKey}`);
    });
    return socket;
  }
}
