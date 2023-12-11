<h1>APTOFY :radio:</h1>
<p>An Decentralized Music Streaming Platform</p>

<p>
The project is a decentralised Music streaming platform based on aptos blockchain. It leverages the fast and scalable TPS (transactions per second) and near zero network fees, ipfs' decentralized storage to deliver a platform where users can upload their work without paying to any intermediaries (unlike the norm in music industry). The platform allows artists to freely express themselves to a large audience without fear of their work being censored from platform. Each penny earned on platform will be provided directly to the creator ( except 5% of total revenue used for keeping platform operational). Users can upload music, podcasts, and other forms of audio content on the platform. 
<br></br>
Initially, only petra wallet is supported for transactions but we plan to integrate other wallets. Also, there is plan of addition on-chain governance for updates in working of contract and additional features.    
</p>

## Contract Deployment and Local Setup

1. Clone the repository
```bash
git clone https://github.com/Team69interIITMadras/team69InterIIT.git
```
2. Ensure that <a href="https://aptos.dev/tools/aptos-cli/install-cli/">Aptos CLI</a> is installed on your system. 
### Deploying the backend
```bash
cd Aptofy/backend
#initiliaze an account for backend 
#the contract is currently for testnet choose testnet
aptos init 
#compile the contract
aptos move compile --named-addresses onchainradio=default
#publish the contract
aptos move publish --named-addresses onchainradio=deafult
```
<b>
The user can also use the presently deployed contract deployed at module address <a href="https://explorer.aptoslabs.com/account/0x764ba2d5b1aa23aa776c292a81c76ccdca46bf1d96f056761b52a9383f0083c3?network=testnet">0x764ba2d5b1aa23aa776c292a81c76ccdca46bf1d96f056761b52a9383f0083c3</a>
</b>

### Deploying the frontend
1. From the root directory go to Frontend/aptofy
```bash
cd Frontend/aptofy
```
2. Change the module address to the account address obtained after publishing the module in constants.js.
3. Create a .env.local file in Frontend/aptofy directory and enter the following information. 
```.env
mongo_url=<mongodb-connection-string>
db_name=<db-name-where-events-are-stored>
```  
4. Install all the packages using yarn and start the frontend using yarn
```bash
yarn 
yarn dev
```
### Setting up indexer service
1. Create <a href="https://www.mongodb.com/">MongoDB</a> and create a cluster.
2. Create a databse and get an API key to access the database. 
3. Make a .env file in indexerService and write the following contents in the file. 
```.env
mongo_url=<mongodb-connection-string>
module_address=<account-address-where-module-is-updated>
db_name=<db-name-where-events-are-stored>
interval=<time-in-milliseconds-after-which-events-sync>
base_transaction_version_song=<transaction-version-after-which-events-must-be-fetched>
base_transaction_version_creator=<transaction-version-after-which-events-must-be-fetched>
```
