const axios = require('axios');
require('dotenv').config();
const {getLatestTxnAddress, insertSongEvents} = require('./songEventsDB');


async function getSongEvents(trxn_address) {
    let data = JSON.stringify({
        "query": `query MyQuery {\n  events(    where: {indexed_type: {_eq: \"${process.env.module_address}::songs::SongPublished\"}, transaction_version: {_gt: \"${trxn_address}\"}}\n  ) {\n    data\n    transaction_version\n  }\n}\n`,
        "variables": null,
        "operationName": "MyQuery"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://indexer-testnet.staging.gcp.aptosdev.com/v1/graphql',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    //console.log(config);
    try{
        const response = await axios.post(config.url, config.data, {
            headers: {
                'Content-Type': 'application/json'
            },
            maxBodyLength: Infinity
        })
        return response.data.data.events;
    }
    catch(error){
        console.log(error);
    }

}

async function processSongEvents(events){
    const procData = [];
    for (var i = 0; i < events.length; i++) {
        let data = events[i].data;
        let imghash = getIPFSHash(data.uri);
        // console.log(data.uri);
        // console.log(events[i].transaction_version);
        let metadata = await fetchIPFSData(imghash);
        const song = {
            transaction_version: events[i].transaction_version,
            title: data.title,
            creator_address: data.creator_address,
            genre: metadata.properties.genre,
            uri: `https://cloudflare-ipfs.com/ipfs/${getIPFSHash(metadata.image)}`,
            cover_uri: `https://cloudflare-ipfs.com/ipfs/${getIPFSHash(data.image_uri)}`,
            description: metadata.description,
            timestamp: data.timestamp
        };
        procData.push(song);
    }
    return procData;
}

function getIPFSHash(data){
    let hash = data.split("ipfs://")[1];
    return hash;
}

async function fetchIPFSData(hash){
    try{
        let response = await axios.get(`https://cloudflare-ipfs.com/ipfs/${hash}`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}

async function SongEvents(){
    try{
        let trxn_address = await getLatestTxnAddress();
        //console.log(trxn_address);
        let events = await getSongEvents(trxn_address);
        events = await processSongEvents(events);
        console.log(events);
        if(events.length > 0){
            await insertSongEvents(events);
        }
    }
    catch(error){
        console.log(error);
    }
}

exports.SongEvents = SongEvents;