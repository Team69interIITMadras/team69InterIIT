const MongoClient = require('mongodb').MongoClient;

async function fetchCreatorName(creator_address, db) {
    try{
        const collection = db.collection('creator');
        const creator = await collection.findOne({"data.creator_address": creator_address}, {projection: {"data.name": 1}});
        return creator.data.name;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

async function fetchSongs(urlQuery) {
    try{
        const query = {};
        if(urlQuery.creator_address){
            query.creator_address = urlQuery.creator_address;
        }
        const client = new MongoClient(process.env.mongo_url);
        await client.connect();
        const db = client.db(process.env.db_name);
        const collection = db.collection('song');
        const songs = await collection.find(query, {projection: {_id: 0}}).sort({ transaction_version: -1 }).toArray();
        for(let i = 0; i < songs.length; i++){
            const creator_address = songs[i].creator_address;
            const creator_name = await fetchCreatorName(creator_address, db);
            songs[i].creator_name = creator_name;
        }
        client.close();
        return songs;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export default async function handler(req, res) {
    const songs = await fetchSongs(req.query);
    if(songs){
        res.status(200).json(songs);
    }
    else{
        res.status(500).json({ error: "Failed to fetch songs" });
    }
}