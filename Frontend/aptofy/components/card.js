import * as React from "react";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import vinyl from "../public/vinyl.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Titlecase } from "../common/utils";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Network, Provider } from "aptos";
import {MODULE_ADDRESS} from "../common/constants";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export default function MusicCard({
    title,
    artist_name,
    cover_uri,
    artist_address,
    onClickHandler,
    isCurrentSong,
    isCurrentSongPlaying,
}) {
    const [amount, setAmount] = React.useState(0);
    const { signAndSubmitTransaction } = useWallet();
    const client = new Provider(Network.TESTNET);

    // add $ button that allows to add number to field and when clicked processes transaction
    const onDollarClick = async (event) => {
        event.preventDefault();
        const amount = prompt("Enter amount to pay: ", "100");
        if (amount == null || amount == "") {
            return;
        }
        try {
            const amount_numeric = JSON.parse(amount)*100000000;
            await payUser(amount_numeric);
        } catch (err) {
            console.log("invalid amount entered!");
        }
    };

    const payUser = async (amount) => {
        const payload = {
            type: `entry_function_payload`,
            function: `${MODULE_ADDRESS}::songs::tip_artist`,
            type_arguments: [],
            arguments: [amount, artist_address],
        };
        const response = await signAndSubmitTransaction(payload);
        return await client.waitForTransaction(response);
    };

    return (
        <div
            style={{ width: "400px" }}
            className={`m-2 rounded border shadow transition-all cursor-pointer ${
                isCurrentSong ? "bg-emerald-100 hover:bg-emerald-200" : "bg-teal-50 hover:bg-teal-100"
            }`}
            onClick={(event) => {
                if (event.target.getAttribute("id")?.toString().includes("payButton")) {
                    return;
                }
                onClickHandler();
            }}
        >
            <div className="w-full flex justify-center shadow bg-black bg-opacity-30 p-5 hover:bg-opacity-40 cursor-pointer transition-all rounded h-52 overflow-hidden items-center">
                {cover_uri ? (
                    <img
                        className="rounded-xl h-48 hover:h-64 hover:animate-pulse transition-all"
                        src={cover_uri}
                        alt="cover"
                        width={"auto"}
                    />
                ) : (
                    <Image src={vinyl} alt="vinyl" width={100} height={100} />
                )}
            </div>
            <div className="w-full flex p-5 pb-20">
                <div className="w-1/2 flex flex-wrap">
                    <div className="w-full pt-3">
                        <Typography gutterBottom variant="h5" fontFamily={"monospace"} component="div">
                            {Titlecase(title)}
                        </Typography>
                    </div>
                    <div className="pl-5 w-full">
                        <Typography fontFamily={"monospace"} variant="body2" color="text.secondary">
                            {Titlecase(artist_name)}
                        </Typography>
                    </div>
                </div>
                <div className="w-1/2 p-4 flex justify-end">
                    <div
                        id="payButton"
                        onClick={onDollarClick}
                        className={`hover:shadow transition-all rounded-full w-fit p-3 cursor-pointer mr-2 bg-amber-400 hover:bg-amber-500`}
                    >
                        <AttachMoneyIcon id="payButton-child" />
                    </div>
                    <div
                        onClick={onClickHandler}
                        className={`hover:shadow transition-all rounded-full w-fit p-3 cursor-pointer ${
                            isCurrentSong ? "bg-emerald-300 hover:bg-emerald-400" : "hover:bg-teal-300 bg-teal-200"
                        }`}
                    >
                        {isCurrentSong && isCurrentSongPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </div>
                </div>
            </div>
        </div>
    );
}
