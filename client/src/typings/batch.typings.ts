export type RoomCreationTimeAverage = {
    total: number;
    averageSinceLast: number;
    worseSinceLast: number;
}

export type BatchResults = {
    numberOfRoomsCreated: number;
    numberOfClientsConnected: number;
    roomCreationTimeAverages: RoomCreationTimeAverage[];
}