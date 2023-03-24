import { OnModuleInit } from '@nestjs/common';
import { Socket } from 'socket.io-client';
export declare class SocketClient implements OnModuleInit {
    SocketClient: Socket;
    constructor();
    onModuleInit(): void;
    private authConsumerEvents;
}
