import { io, Socket } from 'socket.io-client';
import type { ClientAdapter, ClientFactory } from "../typings/adapters.typings";

const EMIT_TIMEOUT = 10000;

export class SocketIoClient implements ClientAdapter {
    constructor(private socket: Socket) {}

    join(roomId: string, username: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            try {
                this.socket.timeout(EMIT_TIMEOUT).emit('join', roomId, username, (clients: string[]) => {
                    resolve(clients);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    disconnect(): Promise<void> {
        return new Promise((resolve) => {
            if (!this.socket.connected) {
                return resolve();
            }

            this.socket.once('disconnect', () => {
                resolve();
            });

            this.socket.disconnect();
        });
    }

    addDisconnectListener(listener: () => void): void {
        this.socket.on('disconnect', listener);
    }
}

export const socketIoClientFactory: ClientFactory<SocketIoClient> = (url: string) => {
    return new Promise((resolve, reject) => {
        const socket = io(url, {
            transports: ["websocket"],
        });
        socket.once('connect', () => {
            resolve(new SocketIoClient(socket));
        });
        socket.once('connect_error', (error: any) => {
            socket.disconnect();
            reject(error);
        });
    });
}