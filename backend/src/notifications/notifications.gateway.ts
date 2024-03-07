import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class NotificationsGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage('notification')
    findAll(@MessageBody() data: any): Observable<WsResponse> {
        return data;
    }
}
