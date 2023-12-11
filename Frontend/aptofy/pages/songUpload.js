import { React, useState } from "react";
import Button from "@mui/material/Button";
import generateNFT from "../common/handleIPFS";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import MODULE_ADDRESS from "../common/constants";
import TextField from "@mui/material/TextField";

export const songUpload = () => {
    const [fileList, setFiles] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isCoverUploaded, setIsCoverUploaded] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [coverList, setCover] = useState([]);

    const client = new Provider(Network.TESTNET);
    const {
        connect,
        account,
        network,
        connected,
        disconnect,
        wallet,
        wallets,
        signAndSubmitTransaction,
        signTransaction,
        signMessage,
    } = useWallet();

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        const fileList = Array.from(selectedFiles);
        console.log(fileList);
        setFiles(fileList);
        setIsFileUploaded(!isFileUploaded);
    };

    const handleCoverChange = (event) => {
        const selectedFiles = event.target.files;
        const fileList = Array.from(selectedFiles);
        console.log(fileList);
        setCover(fileList);
        setIsCoverUploaded(!isCoverUploaded);
    };


    const uploadToChain = async (title, uri, description) => {
        try {
            const payload = {
                type: "entry_function_payload",
                function: `${MODULE_ADDRESS}::songs::publish_song`,
                type_arguments: [],
                arguments: [title, uri[0], uri[1], description],
            };
            const response = await signAndSubmitTransaction(payload);
            console.log("uploaded");
            const ans = await client.waitForTransaction(response.hash);
            return ans;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submit");
        if (fileList.length === 0) {
            alert("Please upload a song");
            return;
        }
        if (coverList.length === 0) {
            alert("Please upload a cover picture for the song");
            return;
        }
        const data = await generateNFT(fileList[0], title, description, genre, coverList[0]);
        console.log(data);
        const ret = await uploadToChain(title, data, description);
        console.log(ret);
    };

    return (
        <div className="flex flex-col select-none">
            <div className="flex flex-1">
                <div className="flex-1 bg-slate-200 overflow-auto rounded p-10">
                    <h1 className="text-3xl">Upload Song</h1>
                    <div className="text-lg p-3">Audio recordings matter to users</div>
                    <form className="mt-4">
                        <div className="mb-3">
                            <TextField
                                name="title"
                                required
                                className="w-full bg-white"
                                placeholder="Title *"
                                inputProps={{ style: {borderRadius: 0.25 + 'rem', color: '#111111', fontWeight: 500, paddingTop: 5, paddingBottom: 5, paddingLeft: 7} }}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField
                                name="genre"
                                required
                                className="w-full bg-white"
                                placeholder="Genre *"
                                inputProps={{ style: {borderRadius: 0.25 + 'rem', color: '#111111', fontWeight: 500, paddingTop: 5, paddingBottom: 5, paddingLeft: 7} }}
                                onChange={(e) => setGenre(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField
                                name="description"
                                required
                                id="outlined-multiline-flexible"
                                label="Description"
                                className="w-full bg-white"
                                multiline
                                rows={4}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center rounded-lg">
                            <div className="flex-1 bg-slate-200 overflow:auto mt-10">
                                <h1 className="text-3xl m-2">Upload Audio</h1>

                                <div
                                    onClick={() => {
                                        document.querySelector("#dropzone-file").click();
                                    }}
                                    className="bg-white hover:bg-slate-50 cursor-pointer select-none transition-all rounded-lg shadow-md p-4"
                                >
                                    {!isFileUploaded ? (
                                        <span className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="p-5 text-gray-500 dark:text-gray-400 text-lg font-semibold">
                                                Click to upload or drag and drop audio files
                                            </p>
                                        </span>
                                    ) : (
                                        <label>
                                            <span>File uploaded</span>
                                        </label>
                                    )}

                                    {!isFileUploaded ? (
                                        <div className="p-2">
                                            <ul>
                                                <li className="flex items-center">Please upload a song</li>
                                                <li className="flex items-center">
                                                    Supported file formats are mp3, wav etc
                                                </li>

                                                <li className="flex items-center">Maximum audio size is 10MB</li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <span>{fileList[0].name}</span>
                                    )}
                                </div>
                                <input
                                    required
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                    accept="audio/*"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center rounded-lg">
                            <div className="flex-1 bg-slate-200 overflow:auto mt-10">
                                <h1 className="text-3xl m-2">Upload Cover Picture</h1>

                                <div
                                    onClick={() => {
                                        document.querySelector("#dropzone-file2").click();
                                    }}
                                    className="bg-white hover:bg-slate-50 cursor-pointer select-none transition-all rounded-lg shadow-md p-4"
                                >
                                    {!isCoverUploaded ? (
                                        <span className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="p-5 text-gray-500 dark:text-gray-400 text-lg font-semibold">
                                                Click to upload or drag and drop picture files
                                            </p>
                                        </span>
                                    ) : (
                                        <label>
                                            <span>File uploaded</span>
                                        </label>
                                    )}

                                    {!isCoverUploaded ? (
                                        <div className="p-2">
                                            <ul>
                                                <li className="flex items-center">Please upload a cover picture for the song</li>
                                                <li className="flex items-center">
                                                    Supported file formats are png, jpeg etc
                                                </li>

                                                <li className="flex items-center">Maximum image size is 10MB</li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <span>{coverList[0].name}</span>
                                    )}
                                </div>
                                <input
                                    required
                                    id="dropzone-file2"
                                    type="file"
                                    className="hidden"
                                    onChange={handleCoverChange}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </form>
                    <Button
                        variant="contained"
                        sx={{ mt: 5, backgroundColor: "#65B741", padding: 2, paddingLeft: 5, paddingRight: 5 }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default songUpload;
