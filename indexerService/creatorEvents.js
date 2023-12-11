const axios = require('axios');
require('dotenv').config();
const {getLatestTxnAddress, insertCreatorEvents} = require('./creatorEventsDB');


async function getCreatorEvents(trxn_address) {
    let data = JSON.stringify({
        "query": `query MyQuery {\n  events(    where: {indexed_type: {_eq: \"${process.env.module_address}::songs::CreatorAdded\"}, transaction_version: {_gt: \"${trxn_address}\"}}\n  ) {\n    data\n    transaction_version\n  }\n}\n`,
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

async function CreatorEvents(){
    try{
        let trxn_address = await getLatestTxnAddress();
        //console.log(trxn_address);
        let events = await getCreatorEvents(trxn_address);
        console.log(events);
        if(events.length > 0){
            await insertCreatorEvents(events);
        }
    }
    catch(error){
        console.log(error);
    }
}

exports.CreatorEvents = CreatorEvents;