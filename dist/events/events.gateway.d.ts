import { WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Observable } from 'rxjs';
import { OnModuleInit } from "@nestjs/common";
export declare class EventGateway implements OnModuleInit {
    server: Server;
    onModuleInit(): void;
    findAll(data: any): Observable<WsResponse<number>>;
    identity(data: number): Promise<number>;
    private registerConsumerEvents;
}
