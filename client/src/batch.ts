import { randomUUID } from "crypto";
import { getClientFactory } from "./adapters";
import type { ClientType, ClientFactory, ClientAdapter } from "./typings/adapters.typings";
import type { BatchResults, RoomCreationTimeAverage } from "./typings/batch.typings";

const QUANTITY_ROOM_CREATION_TIME_AVERAGE = 1000;

export class Batch {

    private clientFactory: ClientFactory;

    private clients: ClientAdapter[] = [];
    private numberOfClientsConnected = 0;
    private numberOfClientsDisconnected = 0;
    private numberOfRoomsCreated = 0;

    private currentRoomCreationTimeTotal = 0;
    private currentRoomCreationTimeWorse = 0;
    private roomCreationTimeAverages: RoomCreationTimeAverage[] = [];
    private lastRoomCreationTimeNumberOfRooms = 0;

    constructor(
        private clientType: ClientType, 
        private url: string, 
        private numberOfClientsPerRoom: number
    ) {
        this.clientFactory = getClientFactory(clientType);   
    }

    async connect(): Promise<ClientAdapter> {
        const client = await this.clientFactory(this.url);
        this.clients.push(client);
        this.numberOfClientsConnected++;
        client.addDisconnectListener(() => {
            this.numberOfClientsDisconnected++;
        });
        return client;
    }

    async createRoom(): Promise<string> {
        const id = randomUUID();

        const promises = Array.from({ length: this.numberOfClientsPerRoom }).map(async (_, index) => {
            const client = await this.connect();
            await client.join(id, `client-${index}`);
        });

        await Promise.all(promises);
        this.numberOfRoomsCreated++;

        return id;
    }

    async disconnectAll(): Promise<void> {
        const promises = this.clients.map(client => client.disconnect());
        await Promise.all(promises);
        this.clients = [];
    }

    addRoomCreationTimeAverage(): void {                    
        this.roomCreationTimeAverages.push({
            total: this.numberOfRoomsCreated,
            averageSinceLast: this.currentRoomCreationTimeTotal / (this.numberOfRoomsCreated - this.lastRoomCreationTimeNumberOfRooms),
            worseSinceLast: this.currentRoomCreationTimeWorse,
        });
        this.currentRoomCreationTimeTotal = 0;
        this.currentRoomCreationTimeWorse = 0;
        this.lastRoomCreationTimeNumberOfRooms = this.numberOfRoomsCreated;
    }
        
    async run(): Promise<BatchResults> {
        while (true) {
            try {
                if (this.numberOfClientsDisconnected > 0) {
                    throw new Error(`A client disconnected unexpectedly`);
                }
                
                const start = process.hrtime();
                await this.createRoom();
                const end = process.hrtime(start);
                const duration = end[0] * 1000 + end[1] / 1000000;

                this.currentRoomCreationTimeTotal += duration;

                if (duration > this.currentRoomCreationTimeWorse) {
                    this.currentRoomCreationTimeWorse = duration;
                }

                if (this.numberOfRoomsCreated - this.lastRoomCreationTimeNumberOfRooms >= QUANTITY_ROOM_CREATION_TIME_AVERAGE) {
                    this.addRoomCreationTimeAverage();
                }

                const durationString = duration.toFixed(1);

                console.log(`Room nº ${this.numberOfRoomsCreated} created in ${durationString}ms, total clients connected: ${this.numberOfClientsConnected}`);
            } catch (error) {
                console.error("Batch errored", error);
                break;
            }
        }

        this.addRoomCreationTimeAverage();

        const result = {
            numberOfRoomsCreated: this.numberOfRoomsCreated,
            numberOfClientsConnected: this.numberOfClientsConnected,
            roomCreationTimeAverages: this.roomCreationTimeAverages
        };

        console.log("Batch finished", result);

        console.log("Disconnecting all clients");
        await this.disconnectAll();

        return result;
    }
}