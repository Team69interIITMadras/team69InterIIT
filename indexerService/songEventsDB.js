const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

async function getLatestTxnAddress(){
    const client = new MongoClient(process.env.mongo_url);
    try {
        await client.connect();
        const database = client.db(process.env.db_name);
        const collection = database.collection('song');
        
        const cursor = collection.find({}, { projection: { transaction_version: 1 } }).sort({ transaction_version: -1 }).limit(1);
        const result = await cursor.toArray();
        if (result.length === 0) {
            return process.env.base_transaction_version_song;
        }
        return result[0].transaction_version;
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

async function insertSongEvents(data) {
    const client = new MongoClient(process.env.mongo_url);
    try {
        await client.connect();
        const database = client.db(process.env.db_name);
        const collection = database.collection('song');
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

exports.getLatestTxnAddress = getLatestTxnAddress;
exports.insertSongEvents = insertSongEvents;