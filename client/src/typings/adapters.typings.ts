export interface ClientAdapter {
    join(roomId: string, username: string): Promise<string[]>;
    disconnect(): Promise<void>;
    addDisconnectListener(listener: () => void): void;
}

export type ClientFactory<T extends ClientAdapter = ClientAdapter> = (url: string) => Promise<T>;

export type ClientType = 'socket.io';