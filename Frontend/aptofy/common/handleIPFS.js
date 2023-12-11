import { NFTStorage } from 'nft.storage'
import { fetchCoverImageURL } from './fetchImageURL';

//Temporary KEY, to be deleted befior publishing/submission
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDYzRGY3MWU2NTNmMzBCMDU2Y2FkNDUzMGZhNWE0OTk1ZGU4ODY5NUYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwMjMwOTQ4MDAyNiwibmFtZSI6ImludGVyaWl0In0.JTvcpmVlB8Dc3sRSwDPO2BvkS25CDXs5YdxfcgMTul4';

const generateNFT = async (file, name, genre, description, cover) => {
    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store({
        name: name,
        description: description,
        image: file,
        properties: {
            genre: genre,
            cover: cover
        }
    });
    const coverURL = await fetchCoverImageURL(metadata.url);
    return [metadata.url, coverURL];
};

export default generateNFT;
