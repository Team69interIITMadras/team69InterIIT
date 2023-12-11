import { NFTStorage } from 'nft.storage'
import axios from 'axios';

//Temporary KEY, to be deleted befior publishing/submission
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzRGY3MWU2NTNmMzBCMDU2Y2FkNDUzMGZhNWE0OTk1ZGU4ODY5NUYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjMwOTQ4MDAyNiwibmFtZSI6ImludGVyaWl0In0.JTvcpmVlB8Dc3sRSwDPO2BvkS25CDXs5YdxfcgMTul4';

const generateNFT = async (name, image) => {
    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store({
        name: name,
        image: image,
        description: 'Creator Image Asset'
    });
    return metadata.url;
}

const fetchGatewayURL = (ipfsURL) => {
    return 'https://cloudflare-ipfs.com/ipfs/' + ipfsURL.split('ipfs://')[1];
}

const fetchImageURL = async (ipfsURL) => {
    const gatewayURL = fetchGatewayURL(ipfsURL);
    const response = await axios.get(gatewayURL);
    return fetchGatewayURL(response.data.image);
}

const uploadImage = async (name, image) => {
    const url = await generateNFT(name, image);
    console.log(url);
    return fetchImageURL(url);
}

export default uploadImage;