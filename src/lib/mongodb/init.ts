import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongo = require("mongodb");
import config from "./config";

let client = null;
let db = null;

// ...
export async function init(): Promise < any > {
    if(!client) {
        client = await mongo.MongoClient.connect(config.mongo.uri, config.mongo.options);
        db = client.db(config.mongo.db);
    }
    return { client, db }
}