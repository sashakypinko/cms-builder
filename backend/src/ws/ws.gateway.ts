import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WsGateway.name);

  @WebSocketServer() server: Server;
  private connectedUsers: Map<string, string> = new Map();

  afterInit() {
    this.logger.log('Initialized');
  }

  handleConnection(client: any) {
    const { sockets } = this.server.sockets;
    const userId = client.handshake.query.userId as string;
    this.connectedUsers.set(userId, client.id);

    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: any) {
    const userId = Array.from(this.connectedUsers.entries()).find(
      ([, socketId]) => socketId === client.id,
    )?.[0];
    if (userId) {
      this.connectedUsers.delete(userId);
    }
  }

  sendMessage<T>(userId: string, message: T): void {
    const targetSocketId = this.connectedUsers.get(userId);

    if (targetSocketId) {
      this.server.to(targetSocketId).emit('notification', message);
    }
  }
}
