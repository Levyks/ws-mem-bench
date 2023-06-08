import { validateClientType } from "./adapters";
import { Batch } from "./batch";
import type { BatchResults } from "./typings/batch.typings";

async function main(args: string[]) {
    if (args.length < 2) {
        console.error('Usage: npm run start <adapter> <url> <numberOfClientsPerRoom? = 5> <delayBetweenBatchesInSeconds? = 10>');
        process.exit(1);
    }

    const adapter = validateClientType(args[0]);
    const url = args[1]!;
    const numberOfClientsPerRoom = parseInt(args[2] || '5', 10);
    const delayBetweenBatchesInSeconds = parseInt(args[3] || '10', 10);

    const results: BatchResults[] = [];
    let batchCount = 0;

    while (true) {
        batchCount++;
        console.log(`Starting batch ${batchCount}...`);
        console.time(`Batch ${batchCount}`);

        const batch = new Batch(adapter, url, numberOfClientsPerRoom);
        const result = await batch.run();
        
        console.log(`Batch ${batchCount} finished with results:`, result);
        console.timeEnd(`Batch ${batchCount}`);

        if (result.numberOfClientsConnected === 0) {
            break;
        }

        results.push(result);

        console.log(`Waiting ${delayBetweenBatchesInSeconds} seconds before starting next batch...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatchesInSeconds * 1000));
    }

    console.log(`Batch results:`);
    results.forEach((result, index) => {
        console.log(`Batch ${index + 1}:`, result);
    });
}

main(process.argv.slice(2));