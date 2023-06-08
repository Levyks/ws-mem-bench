import { socketIoClientFactory } from "./socket-io.adapter";
import type { ClientType, ClientFactory } from "../typings/adapters.typings";

const availableClientTypes: ClientType[] = ['socket.io'];

export function validateClientType(possibleClientType: unknown): ClientType {
    if (typeof possibleClientType !== 'string') {
        throw new Error(`Client type must be a string`);
    }

    if (!availableClientTypes.includes(possibleClientType as ClientType)) {
        throw new Error(`Unknown client type ${possibleClientType}`);
    }

    return possibleClientType as ClientType;
}

export function getClientFactory(clientType: ClientType): ClientFactory {
    switch (clientType) {
        case 'socket.io':
            return socketIoClientFactory;
        default:
            throw new Error(`Unknown client type ${clientType}`);
    }
}